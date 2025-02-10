"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = require("mongoose");
const projectSchema = new mongoose_1.Schema({
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
    // src: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    frontendCode: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (v) {
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
            validator: function (v) {
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
            validator: function (v) {
                return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
            },
            message: (props) => `${props.value} is not a valid URL!`,
        },
    },
    imageUrl: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (v) {
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
        default: true,
    },
});
exports.Project = (0, mongoose_1.model)("Project", projectSchema);
