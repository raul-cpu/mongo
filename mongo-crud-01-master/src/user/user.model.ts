// ODM: Object Document Mapper
import * as mongoose from 'mongoose';

// Se define la estructura de la colección en Mongo
export const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    points: { type: Number, required: true }
});

// Interface, sirve para el transporte de datos B.E. <-> F.E.
export interface User extends mongoose.Document {
    id: string;
    name: string;
    surname: string;
    points: number;
}