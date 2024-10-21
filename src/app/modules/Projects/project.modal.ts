/* eslint-disable @typescript-eslint/no-explicit-any */
import { model, Schema } from "mongoose";
import { IProject } from "./project.interface";

const projectSchema: Schema<IProject> = new Schema({
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
  src: {
    type: String,
    required: true,
    trim: true,
  },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  frontendCode: {
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
  backendCode: {
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
  liveLink: {
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
  features: {
    type: [String],
    required: true,
  },
  technologies: {
    type: [String],
    required: true,
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

export const Project = model<IProject>("Project", projectSchema);
