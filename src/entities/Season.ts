import { Schema, model, Document } from 'mongoose';

import { ISite } from './Site';

interface ISeason extends Document {
  _id: Schema.Types.ObjectId;
  site: Schema.Types.ObjectId | ISite;
  title: string;
  number: number;
  finalized?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

const seasonSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    site: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Site',
    },
    title: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      default: 0,
    },
    finalized: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const Season = model('Season', seasonSchema);

export { Season, ISeason };
