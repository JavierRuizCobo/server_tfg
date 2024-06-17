import mongoose, { Schema, Document } from 'mongoose';

interface IPlannedRoutine extends Document {
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
  createdBy: mongoose.Types.ObjectId;
  creationDate: Date;
}

const PlannedRoutineSchema: Schema = new Schema({
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
  createdBy: { type: Schema.Types.ObjectId, required: true },
  creationDate: { type: Date, default: Date.now }
});

export const PlannedRoutine = mongoose.model<IPlannedRoutine>('PlannedRoutine', PlannedRoutineSchema);
