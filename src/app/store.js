import { configureStore } from '@reduxjs/toolkit';
import currentUserReducer from '../features/currentUser/currentUserSlice';
import postsReducer from '../features/posts/postsSlice';
import usersReducer from '../features/users/usersSlice';

export const store = configureStore({
	reducer: {
		posts: postsReducer,
		users: usersReducer,
		currentUser: currentUserReducer,
	},
});
