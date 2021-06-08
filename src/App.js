import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import {
	ConnectToPeopleContainer,
	FollowPage,
	PostsContainer,
	SingleTweet,
	UserProfile,
} from './features';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsers } from './features/users/usersSlice';
import { loadCurrentUser } from './features/currentUser/currentUserSlice';

function App() {
	const users = useSelector((state) => state.users);
	const currentUser = useSelector((state) => state.currentUser);

	const dispatch = useDispatch();

	useEffect(() => {
		(async function () {
			if (users.status.LOAD_USERS === 0) await dispatch(loadUsers());
		})();
		(async function () {
			if (currentUser.status === 'idle') await dispatch(loadCurrentUser());
		})();
	}, [dispatch, users.status, currentUser.status]);

	return currentUser.status === 'success' ? (
		<div className='App text-gray-600 box-border md:w-1/2 md:m-auto my-2 mx-2'>
			<Routes>
				<Route path='/connect' element={<ConnectToPeopleContainer />}></Route>
				<Route path='/tweet/:tweetId' element={<SingleTweet />}></Route>
				<Route path='/:userName' element={<UserProfile />}></Route>
				<Route path='/:userName/following' element={<FollowPage />}></Route>
				<Route path='/:userName/followers' element={<FollowPage />}></Route>
				<Route path='/' element={<PostsContainer />}></Route>
			</Routes>{' '}
		</div>
	) : (
		<p>Loading...</p>
	);
}

export default App;
