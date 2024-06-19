import { Document, Schema, model, Types } from 'mongoose';

export interface IRoutine extends Document {
  name: string;
  description: string;
  exercises: Types.ObjectId[];
  created_by: Types.ObjectId;
  assigned_to?: Types.ObjectId;
  creation_date: Date;
  modified_by?: Types.ObjectId;
}

const routineSchema = new Schema<IRoutine>({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  exercises: [{
    type: Schema.Types.ObjectId,
    ref: 'Exercise',
    required: true
  }],
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assigned_to: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  creation_date: {
    type: Date,
    default: Date.now,
    required: true
  },
  modified_by: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Routine = model<IRoutine>('Routine', routineSchema);

export default Routine;
