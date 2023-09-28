import mongoose from "mongoose";

export interface ICourse {
    title: string;
    description: string;
    userId: mongoose.Types.ObjectId;
    tags?: [string];
    image: string;
    meta: {
        currency: string;
        price: number
    }
}