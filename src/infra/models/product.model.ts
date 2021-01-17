import { Document, Schema, model } from 'mongoose';

interface IProductBase {
    userId: string;
    name: string;
    value: number;
    identCode: string;
    description: string;
    unitType: string;
    brand: string;
}

export interface IProductModel extends Partial<IProductBase> {
    id: string;
}

interface IProductDocument extends IProductBase, Document {}

const ProductSchema = new Schema<IProductDocument>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    identCode: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    unitType: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: false
    }
});

export default model('Product', ProductSchema);