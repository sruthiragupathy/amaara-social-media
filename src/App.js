import React, { useEffect } from 'react';
import './App.css';
import { Routes } from 'react-router-dom';
import {
	ConnectToPeopleContainer,
	FollowPage,
	PostsContainer,
	SingleTweet,
	UserProfile,
	Login,
	PrivateRoutes,
	PublicRoutes,
	SignUp,
} from './features';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsers } from './features/users/usersSlice';
import {
	loadCurrentUser,
	setToken,
} from './features/currentUser/currentUserSlice';

function App() {
	const { token } = useSelector((state) => state.currentUser);
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
				<PublicRoutes path='/signup' element={<SignUp />} />
			</Routes>
		</div>
	);
}

export default App;
