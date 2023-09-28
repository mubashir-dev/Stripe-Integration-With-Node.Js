import { Schema, model } from 'mongoose';
import { ICourse } from '../interfaces/course.interface';
import { userModel } from './user.model';
import { CurrencyOption } from '../common/query-options';

const courseSchema = new Schema<ICourse>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: userModel },
    tags: [{ type: String, required: false }],
    image: { type: String, required: true },
    meta: {
        currency: {
            type: String,
            required: true,
            enum: ['USD','PKR']
        },
        price: { type: Number, required: true },
    }
}, { timestamps: true });

export const courseModel = model<ICourse>('Course', courseSchema);
