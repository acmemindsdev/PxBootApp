import getEnvVars from 'src/environment';

/******************************************/
export const baseApi = getEnvVars().API_PATH;

/******************************************/
// Send OTP on Mobile Number
export const getMobileOTP = baseApi + '/notification/sendMobileOTP';

// Verify OTP
export const verifyMobileOTP =
  baseApi + '/notification/validateOTPAndUpdateUser';
