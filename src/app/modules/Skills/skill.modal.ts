/* eslint-disable @typescript-eslint/no-explicit-any */
import { model, Schema } from "mongoose";
import { ISkill } from "./skill.interface";

const skillSchema: Schema<ISkill> = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },

  imageUrl: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (v: any) {
        return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
  color: {
    type: String,
    required: false,
  },
  rank: {
    type: Number,
    required: false,
    default: 0,
  },
  totalProjects: {
    type: Number,
    required: false,
    default: 0,
  },

  createdAt: {
    type: String,
    default: new Date().toString(),
  },
  updatedAt: {
    type: String,
    default: new Date().toString(),
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
});

export const Skill = model<ISkill>("Skill", skillSchema);
