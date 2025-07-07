export function generateOtp(): number {
  let otp: number;
  do {
    otp = Math.floor(100000 + Math.random() * 900000); // Ensures a 6-digit number not starting with 0
  } while (otp < 100000 || otp > 999999);
  return otp;
}