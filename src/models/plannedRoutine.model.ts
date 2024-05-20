import mongoose, { Schema, Document } from 'mongoose';

interface IPlannedRoutine extends Document {
  userId: mongoose.Types.ObjectId;
  routineId: mongoose.Types.ObjectId;
  date: Date;
  completed: boolean;
  exercises: {
    exerciseId: mongoose.Types.ObjectId;
    series: {
      reps: number;
      weight: number;
    }[];
  }[];
  notes: string;
  createdBy: mongoose.Types.ObjectId;
  creationDate: Date;
}

const PlannedRoutineSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: false },//
  routineId: { type: Schema.Types.ObjectId, required: true },
  date: { type: Date, required: true },
  completed: { type: Boolean, default: false },
  exercises: [{
    exerciseId: { type: Schema.Types.ObjectId,ref: 'Exercise',required: true },
    series: [{
      reps: { type: Number, required: true },
      weight: { type: Number, required: true }
    }],
  }],
  notes: { type: String, default: '' },
  createdBy: { type: Schema.Types.ObjectId, required: false },//
  creationDate: { type: Date, default: Date.now }
});

export const PlannedRoutine = mongoose.model<IPlannedRoutine>('PlannedRoutine', PlannedRoutineSchema);
