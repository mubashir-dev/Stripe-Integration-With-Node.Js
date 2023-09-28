import { Request, Response, NextFunction } from "express";
import { stripeConfig } from "../config";
import { courseService } from ".";
import { courseModel } from "../models/course.model";
import { apiResponse } from "../utils";
import { stripe } from "../common/stripe";


export async function stripePaymentLink(req: Request, res: Response, next: NextFunction) {
    const { id } = res.locals.USER_DATA;
    const { courseId } = req.body;

    const course = await courseModel.findOne({ _id: courseId });
    if (!course) return apiResponse({ response: res, message: "Course not found", code: 404 });

    //process course 
    const courseItem = {
        price_data: {
            currency: course.meta.currency,
            product_data: {
                name: course.title,
                images: [
                    course.image
                ]
            },
            unit_amount: course.meta.price,
        },
        quantity: 1,
    };

    //create stripe customer
    const customer = await stripe.customers.create({
        metadata: {
            userId: id,
            cart: JSON.stringify(courseItem)
        }
    });

    //create stripe customer
    const session = await stripe.checkout.sessions.create({
        line_items: [
            courseItem
        ],
        // shipping_options: [
        //     {
        //         shipping_rate_data: {
        //             type: "fixed_amount",
        //             fixed_amount: {
        //                 amount: 1100,
        //                 currency: "usd",
        //             },
        //             display_name: "Standard Shipping Rate",
        //             // Delivers between 5-7 business days
        //             delivery_estimate: {
        //                 minimum: {
        //                     unit: "business_day",
        //                     value: 5,
        //                 },
        //                 maximum: {
        //                     unit: "business_day",
        //                     value: 7,
        //                 },
        //             },
        //         },
        //     },
        // ],
        phone_number_collection: {
            enabled: true,
        },
        invoice_creation: {
            enabled: true,
        },
        allow_promotion_codes: true,
        mode: 'payment',
        customer: customer.id,
        success_url: 'http://localhost:4242/success',
        cancel_url: 'http://localhost:4242/cancel.html',
    });

    return session;
}

export async function retrievePaymentLink(req: Request, res: Response, next: NextFunction) {
    const { id  }  = req.params
    const data = await stripe.checkout.sessions.retrieve(id);
    return data;
}