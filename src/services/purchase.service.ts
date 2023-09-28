import { Request, Response, NextFunction } from "express";
import { title } from "process";
import { coursePurchaseModel } from "../models/course-purchase.model";
import { courseModel } from "../models/course.model";
import { apiResponse } from "../utils";
import { stripe } from "../common/stripe";
import { ObjectId, Types } from "mongoose";


export async function purchaseCourse(req: Request, res: Response, next: NextFunction) {
    const { id } = res.locals.USER_DATA;
    const { courseId, sessionId } = req.body;

    //course  & already purchased check
    const [courseExists, coursePurchase] = await Promise.all([
        courseModel.findOne({ _id: courseId }),
        coursePurchaseModel.findOne({ courseId, userId: id })
    ]);

    //check for session id 
    const payment = await stripe.checkout.sessions.retrieve(sessionId);
    if (!payment) return apiResponse({
        response: res,
        message: "Payment not found",
        code: 400
    });


    if (!courseExists) return apiResponse({ response: res, message: `Course not found`, code: 404 });
    if (coursePurchase) return apiResponse({ response: res, message: `Course already purchased`, code: 409 });

    //save purchase & generate stripe payment link
    const coursePurchaseData = coursePurchaseModel.create({
        courseId,
        userId: id,
        amount: payment.amount_total,
        currency: payment.currency,
        sessionId: payment.id,
        status: payment.status,
        paymentStatus: payment.payment_status
    });

    return coursePurchaseData;
}

async function aggregatePurchase(findOptions?: any) {
    const { userId } = findOptions;
    let findQuery = {
        userId: new Types.ObjectId(userId),
    }
    findQuery = findOptions?.id && { ...findQuery, _id: new Types.ObjectId(findOptions.id) };
    const data = await coursePurchaseModel.aggregate([
        {
            $match: {
                ...findQuery
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                pipeline: [
                    {
                        $project: {
                            "_id": 1,
                            "name": 1,
                            "email": 1,
                        }
                    },
                ],
                as: "createdBy",
            },
        },
        {
            $unwind: "$createdBy"
        },
        {
            $lookup: {
                from: "courses",
                localField: "courseId",
                foreignField: "_id",
                pipeline: [
                    {
                        $project: {
                            "_id": 1,
                            "title": 1,
                            "description": 1,
                            "image": 1
                        }
                    },
                ],
                as: "course",
            },
        },
        {
            $unwind: "$course"
        }
    ]);

    return data;
}


export async function purchaseList(req: Request, res: Response, next: NextFunction) {
    const { id } = res.locals.USER_DATA;
    const data = await aggregatePurchase({ userId: id });
    return data;
}

export async function purchaseDetails(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const data = await aggregatePurchase({ userId: res.locals.USER_DATA.id, id });
    return data;
}