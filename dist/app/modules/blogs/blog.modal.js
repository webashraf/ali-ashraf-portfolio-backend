"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
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
    rank: {
        type: Number,
        required: false,
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
exports.Blog = (0, mongoose_1.model)("Blog", blogSchema);
