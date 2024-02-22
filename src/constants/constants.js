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
export const UNAUTHORIZED = 'Unauthorized';
export const unAuthError = 'Session expired. Please refresh or login again.'

//Friends Page
export const friendsError = 'Error while fetching friends. Please refresh or try again later.'
export const noFriendsDisplayText = 'You have 0 friends. Start by adding some friends.'
export const noUsersDisplayText = 'There are no users to show currently.'

//UserList Component
export const friendList = 'friendList';
export const addFriendList = 'addFriendList';
export const addFriendErrorMsg = 'Error while adding friend';


//Common states for API calls
export const SUCCESS = 'success';
export const LOADING = 'loading';
export const ERROR = 'error';
export const IDLE = 'idle';
