import { Schema, Document, model, Types } from 'mongoose';

interface ExerciseDocument extends Document {
    name: string;
    description: string;
    difficulty: string;
    muscles: string;
    image: string;
    video: string;
    created_by: Types.ObjectId;
    creation_date: Date;
}

const exerciseSchema = new Schema<ExerciseDocument>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, required: true },
    muscles: { type: String, required: true },
    image: { type: String, required: false },
    video: { type: String, required: false },
    created_by: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    creation_date: { type: Date, default: Date.now }
});


const Exercise = model<ExerciseDocument>('Exercise', exerciseSchema);

export default Exercise;
