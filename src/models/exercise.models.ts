import { Schema, Document, model, Types } from 'mongoose';

export interface ExerciseDocument extends Document {
    name: string;
    description: string;
    difficulty: string;
    muscles: string;
    image?: string;
    video?: string;
    created_by?: Types.ObjectId;
    creation_date: Date;
}

const exerciseSchema = new Schema<ExerciseDocument>({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, enum: ['Fácil', 'Media', 'Difícil'] },
    muscles: { type: String, required: true, trim: true },
    image: { type: String, trim: true },
    video: { type: String, trim: true, validate: {
        validator: function(v: string) {
            return /(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/.test(v);
        },
        message: props => `${props.value} is not a valid YouTube URL!`
    }},
    created_by: { type: Schema.Types.ObjectId, ref: 'User' },
    creation_date: { type: Date, default: Date.now }
});

const Exercise = model<ExerciseDocument>('Exercise', exerciseSchema);

export default Exercise;
