//LKRoom.js
export const LiveKitRoomURL = "wss://first-app-2i3sztgn.livekit.cloud";

//Backend
export const AppName = "LiveFeed";
export const serverURL = `${import.meta.env.VITE_SERVER_URL}`;
export const serverGraphqlUrl = `${serverURL}/graphql`;
export const serverRoomTokenUrl = `${serverURL}/getRoomToken`;

//Auth
export const tokenStorageTitle = 'livefeed-token';

//Auth messages
export const registrationSuccess = 'User registration successful.';
export const registerationFailure = 'Registration failed.';
export const loginSuccess = 'User login successful.';
export const loginFailure = 'Login failed.';