/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";

// Interface for JWT payload
interface JwtPayload {
  email: string;
  role: string;
}

// Generate a JWT token
export const createToken = (
  jwtPayload: JwtPayload,
  secret: string,
  expiresIn: any = "1h" // Default expiration time
): string => {
  try {
    // Define options explicitly
    const options: SignOptions = {
      expiresIn,
    };

    // Use synchronous overload
    return jwt.sign(jwtPayload, secret, options);
  } catch (error) {
    console.error("Error creating token:", error);
    throw new Error("Failed to create token");
  }
};

// Example usage
const payload = { email: "user@example.com", role: "admin" };
const secret = "your-secret-key";
// eslint-disable-next-line no-unused-vars
const token = createToken(payload, secret);
export const isPasswordMatched = async (
  password: string,
  hashPassword: string
): Promise<boolean> => {
  const comparePass = await bcrypt.compare(password, hashPassword);
  return comparePass;
};
