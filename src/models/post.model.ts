import mongoose, { Schema, Document } from 'mongoose';

interface IHealthyHabits extends Document {
    title: string;
    content: string;
    created_by: mongoose.Types.ObjectId;
    creation_date: Date;
}

const HealthyHabitsSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    created_by: { type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    creation_date: { type: Date, default: Date.now }
});

const HealthyHabitsModel = mongoose.model<IHealthyHabits>('HealthyHabits', HealthyHabitsSchema);

export { HealthyHabitsModel, IHealthyHabits, HealthyHabitsSchema };
