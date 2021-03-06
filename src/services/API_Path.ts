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
export const getContent = baseApi + '/content/getSignedURL';

// submitContent Content token for upload media
export const submitContent = baseApi + '/content/submitcontent';

// Get Media list
export const mediaContentList = baseApi + '/content/list';

// Patient Related api
export const patient = baseApi + '/patient';

// Fetch Hospital List api
export const hospitalList = baseApi + '/hospital/list';
