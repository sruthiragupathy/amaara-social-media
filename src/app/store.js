import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import currentUserReducer from '../features/currentUser/currentUserSlice';
import postsReducer from '../features/posts/postsSlice';
import usersReducer from '../features/users/usersSlice';

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		posts: postsReducer,
		users: usersReducer,
		currentUser: currentUserReducer,
	},
});
