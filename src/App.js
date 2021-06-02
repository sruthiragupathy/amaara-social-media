import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import {
	ConnectToPeopleContainer,
	PostsContainer,
	SingleTweet,
} from './features';

function App() {
	return (
		<div className='App text-gray-700 box-border'>
			<Routes>
				<Route path='/connect' element={<ConnectToPeopleContainer />}></Route>
				<Route path='/tweet/:tweetId' element={<SingleTweet />}></Route>
				<Route path='/' element={<PostsContainer />}></Route>
			</Routes>
		</div>
	);
}

export default App;
