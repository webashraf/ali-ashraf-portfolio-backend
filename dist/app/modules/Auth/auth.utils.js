"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPasswordMatched = exports.createToken = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Generate a JWT token
const createToken = (jwtPayload, secret, expiresIn = "1h" // Default expiration time
) => {
    try {
        // Define options explicitly
        const options = {
            expiresIn,
        };
        // Use synchronous overload
        return jsonwebtoken_1.default.sign(jwtPayload, secret, options);
    }
    catch (error) {
        console.error("Error creating token:", error);
        throw new Error("Failed to create token");
    }
};
exports.createToken = createToken;
// Example usage
const payload = { email: "user@example.com", role: "admin" };
const secret = "your-secret-key";
const token = (0, exports.createToken)(payload, secret);
console.log("Generated Token:", token);
const isPasswordMatched = (password, hashPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const comparePass = yield bcrypt_1.default.compare(password, hashPassword);
    return comparePass;
});
exports.isPasswordMatched = isPasswordMatched;
