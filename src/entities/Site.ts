import { Schema, model, Document } from 'mongoose';

import { IAnime } from './Anime';
import { ISeason } from './Season';

interface ISite extends Document {
  _id: Schema.Types.ObjectId;
  anime: Schema.Types.ObjectId | IAnime;
  title: string;
  url: string;
  streaming: boolean;
  enabled: boolean;
  seasons: Schema.Types.ObjectId[] | ISeason[];
}

const siteSchema = new Schema<ISite>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    anime: {
      type: Schema.Types.ObjectId,
      ref: 'Anime',
    },
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      require: true,
    },
    streaming: {
      type: Boolean,
      required: true,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    seasons: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Season',
      },
    ],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const Site = model('Site', siteSchema);

export { Site, ISite };
