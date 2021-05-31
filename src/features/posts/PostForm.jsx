import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { tweetPosted } from './postsSlice';

export const PostForm = () => {
	const [tweet, setTweet] = useState('');
	const onTweetChanged = (e) => {
		setTweet(e.target.value);
	};
	const dispatch = useDispatch();

	const onTweetPostClicked = (e) => {
		e.preventDefault();
		dispatch(tweetPosted({ tweet }));
		setTweet('');
	};

	return (
		<form onSubmit={(e) => onTweetPostClicked(e)}>
			<input
				placeholder='Add a tweet'
				value={tweet}
				onChange={(e) => onTweetChanged(e)}
			/>
			<button type='submit'>Tweet</button>
		</form>
	);
};
