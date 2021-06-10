import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {
	ConnectToPeopleContainer,
	FollowPage,
	PostsContainer,
	SingleTweet,
	UserProfile,
} from './features';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsers } from './features/users/usersSlice';
import {
	loadCurrentUser,
	setToken,
} from './features/currentUser/currentUserSlice';
import { statusEnum } from './utils/utils';
import { Login } from './features/currentUser/Login';

function App() {
	const users = useSelector((state) => state.users);
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
			await dispatch(setToken({ token: loginCredentials.token }));
			if (status.LOAD_CURRENT_USER === statusEnum['SUCCESS']) {
				navigate('/home');
			}
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
		<>
			<div className='App text-gray-600 box-border md:w-1/2 md:m-auto my-2 mx-2'>
				<Routes>
					<Route path='/connect' element={<ConnectToPeopleContainer />}></Route>
					<Route path='/tweet/:tweetId' element={<SingleTweet />}></Route>
					<Route path='/:userName' element={<UserProfile />}></Route>
					<Route path='/:userName/following' element={<FollowPage />}></Route>
					<Route path='/:userName/followers' element={<FollowPage />}></Route>
					<Route path='/home' element={<PostsContainer />}></Route>
				</Routes>{' '}
			</div>
			<Routes>
				<Route path='/' element={<Login />}></Route>
			</Routes>
		</>
	);
}

export default App;
