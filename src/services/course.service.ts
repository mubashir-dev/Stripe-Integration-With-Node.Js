import { NextFunction, Request, Response } from "express";
import { courseModel } from "../models/course.model";
import { apiResponse } from "../utils";
import { AggregateOptions, Schema } from "mongoose";
import { Types } from 'mongoose';

export async function store(req: Request, res: Response, next: NextFunction) {
    const { id } = res.locals.USER_DATA;
    const { title } = req.body;

    //check if the course is already created
    const courseExists = await courseModel.findOne({ title });
    if (courseExists) return apiResponse({ response: res, message: `Course already exists with this "${title}" title`, code: 409 });

    //saving the course
    const course = new courseModel({
        ...req.body
    });
    course.userId = id;
    const courseData = await course.save();
    return courseData;
}

async function aggregateCourse(findOptions?: any) {
    let findQuery = {};
    findQuery = findOptions && { _id: new Types.ObjectId(findOptions.id) };
    const data = await courseModel.aggregate([
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
            $project: {
                "_id": 1,
                "title": 1,
                "description": 1,
                "tags": 1,
                "image": 1,
                "meta": 1,
                "createdBy": 1,
                "createdAt": 1,
                "updatedAt": 1
            }
        },
    ]);
    return data;
}

export async function find(req: Request, res: Response, next: NextFunction) {
    const data = await aggregateCourse();
    return data;
}

export async function findOne(req: Request, res: Response, next: NextFunction) {
    const data = await aggregateCourse({ id: req.params.id });
    return data;
}
