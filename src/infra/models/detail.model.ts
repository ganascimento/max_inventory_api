import { Document, Schema, model } from 'mongoose';

interface IDetailBase {
    userId: string;
    inventoryId: string;
    description: string;
    date: Date;
    isAdd: boolean;
}

export interface IDetailModel extends Partial<IDetailBase> {
    id?: string;
}

interface IDetailDocument extends IDetailBase, Document {}

const DetailSchema = new Schema<IDetailDocument>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    inventoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Inventory',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    isAdd: {
        type: Boolean,
        required: true
    }
});

export default model('Detail', DetailSchema)