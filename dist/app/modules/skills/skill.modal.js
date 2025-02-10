"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skill = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = require("mongoose");
const skillSchema = new mongoose_1.Schema({
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
    level: {
        type: String,
        enum: ["expertise", "comfortable", "familiar", "tools", "interpersonal"],
        required: true,
    },
});
exports.Skill = (0, mongoose_1.model)("Skill", skillSchema);
