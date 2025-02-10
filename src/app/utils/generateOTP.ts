import crypto from "crypto";

export function secureOTP(length = 6) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charsLength = chars.length;
  let otp = "";

  // Generate secure random bytes
  const randomBytes = crypto.randomBytes(length);

  for (let i = 0; i < length; i++) {
    // Use modulo to ensure the index is within the range of `chars`
    const randomIndex = randomBytes[i] % charsLength;
    otp += chars[randomIndex];
  }

  return otp;
}
