import getEnvVars from 'src/environment';

/******************************************/
export const baseApi = getEnvVars().API_PATH;

/******************************************/
// Send OTP on Mobile Number
export const getMobileOTP = baseApi + '/notification/sendMobileOTP';

// Verify OTP
export const verifyMobileOTP =
  baseApi + '/notification/validateOTPAndUpdateUser';

// Update User Data
export const updateUser = baseApi + '/user';

// Create Content Id to upload media
export const getContent = baseApi + '/content';

// Patient Related api
export const patient = baseApi + '/patient';
