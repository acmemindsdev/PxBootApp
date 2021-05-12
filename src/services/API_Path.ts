import getEnvVars from 'src/environment';

/******************************************/
export const baseApi = getEnvVars().API_PATH;

/******************************************/
// Get OTP on Mobile Number
export const getMobileOTP = baseApi + '/getMobileOTP';

// Verify OTP
export const verifyMobileOTP = baseApi + '/validateAndUpdateUser';
