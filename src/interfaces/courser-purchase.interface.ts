import mongoose from "mongoose";

export interface ICoursePurchase {
    courseId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    amount: number,
    currency: string,
    sessionId: string,
    status: string;
    paymentStatus:string;
}