import { Schema, model, Document } from 'mongoose';

import { ISite } from './Site';

interface IAnime extends Document {
  _id: Schema.Types.ObjectId;
  title: string;
  created_at?: Date;
  updated_at?: Date;
  sites: Schema.Types.ObjectId[] | ISite[];
}

const animeSchema = new Schema<IAnime>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    sites: [{ type: Schema.Types.ObjectId, ref: 'Site' }],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const Anime = model('Anime', animeSchema);

export { Anime, IAnime, animeSchema };
