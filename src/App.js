import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import {
	ConnectToPeopleContainer,
	FollowPage,
	PostsContainer,
	SingleTweet,
	UserProfile,
} from './features';

function App() {
	return (
		<div className='App text-gray-600 box-border md:w-9/12 md:m-auto my-2 mx-2'>
			<Routes>
				<Route path='/connect' element={<ConnectToPeopleContainer />}></Route>
				<Route path='/tweet/:tweetId' element={<SingleTweet />}></Route>
				<Route path='/:userName' element={<UserProfile />}></Route>
				<Route path='/:userName/following' element={<FollowPage />}></Route>
				<Route path='/:userName/followers' element={<FollowPage />}></Route>
				<Route path='/' element={<PostsContainer />}></Route>
			</Routes>
		</div>
	);
}

export default App;
