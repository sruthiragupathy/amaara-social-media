import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { PostsContainer } from './features';

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route to='/' element={<PostsContainer />}></Route>
			</Routes>
		</div>
	);
}

export default App;
