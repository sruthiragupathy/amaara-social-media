import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {
	ConnectToPeopleContainer,
	FollowPage,
	PostsContainer,
	SingleTweet,
	UserProfile,
	Login,
	PrivateRoutes,
	PublicRoutes,
} from './features';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsers } from './features/users/usersSlice';
import {
	loadCurrentUser,
	setToken,
} from './features/currentUser/currentUserSlice';
import { Nav } from './Nav/Nav';

function App() {
	const { currentUser, token, status } = useSelector(
		(state) => state.currentUser,
	);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		(async function () {
			const loginCredentials = JSON.parse(
				localStorage?.getItem('logincredentials'),
			);
			loginCredentials?.token &&
				loginCredentials?.userName &&
				(await dispatch(
					loadCurrentUser({
						userName: loginCredentials.userName,
						token: loginCredentials.token,
					}),
				));
			loginCredentials?.token &&
				(await dispatch(setToken({ token: loginCredentials.token })));
		})();
	}, []);

	useEffect(() => {
		if (token) {
			(async function () {
				await dispatch(loadUsers({ token }));
			})();
		}
	}, [token]);

	return (
		<div className=''>
			<Routes>
				<PrivateRoutes path='/tweet/:tweetId' element={<SingleTweet />} />
				<PrivateRoutes path='/:userName' element={<UserProfile />} />
				<PrivateRoutes
					exact
					path='/connect'
					element={<ConnectToPeopleContainer />}
				/>
				<PrivateRoutes path='/:userName/following' element={<FollowPage />} />
				<PrivateRoutes path='/:userName/followers' element={<FollowPage />} />
				<PrivateRoutes path='/' exact element={<PostsContainer />} />

				<PublicRoutes path='/login' element={<Login />} />
			</Routes>
		</div>
	);
}

export default App;
