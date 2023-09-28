import { Schema, model } from 'mongoose';
import { userModel } from './user.model';
import { ICoursePurchase } from '../interfaces';
import { courseModel } from './course.model';

const coursePurchaseSchema = new Schema<ICoursePurchase>({
    courseId: { type: Schema.Types.ObjectId, ref: courseModel, required: true },
    userId: { type: Schema.Types.ObjectId, ref: userModel, required: true },
    amount: { type: Number, required: true },
    currency: {
        type: String, required: true, enum: ['usd', 'pkr']
    },
    sessionId: { type: String, required: true, unique: true },
    paymentStatus: {
        type: String, required: true, enum: ['paid', 'not_paid']
    },
    status: {
        type: String, required: true, enum: ['incomplete', 'complete']
    }
}, { timestamps: true });

export const coursePurchaseModel = model<ICoursePurchase>('CoursePurchase', coursePurchaseSchema);
