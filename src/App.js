import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { PostsContainer, SingleTweet } from './features';

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/tweet/:tweetId' element={<SingleTweet />}></Route>
				<Route path='/' element={<PostsContainer />}></Route>
			</Routes>
		</div>
	);
}

export default App;
