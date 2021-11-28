import { Schema, model, Document } from 'mongoose';

import { ISeason } from './Season';

interface IEpisode extends Document {
  _id: Schema.Types.ObjectId;
  number: number;
  season: Schema.Types.ObjectId | ISeason;
  created_at?: Date;
  updated_at?: Date;
}

const episodeSchema = new Schema<IEpisode>(
  {
    _id: {
      type: Schema.Types.ObjectId,
    },
    season: { type: Schema.Types.ObjectId, ref: 'Season' },
    number: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const Episode = model('Episode', episodeSchema);

export { Episode, IEpisode };
