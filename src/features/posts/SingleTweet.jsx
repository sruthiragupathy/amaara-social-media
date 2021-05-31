import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { tweetEdited } from './postsSlice';

export const SingleTweet = () => {
	const { tweetId } = useParams();
	const [editable, setEditable] = useState(false);
	const [editTweet, setEditTweet] = useState('');
	const dispatch = useDispatch();

	const currentTweet = useSelector((state) => {
		return state.posts.find((post) => post.id === tweetId);
	});

	const onEditClicked = (e) => {
		e.preventDefault();
		setEditable((editable) => !editable);
		setEditTweet(currentTweet.post);
	};

	const onEditTweetChanged = (e) => {
		setEditTweet(e.target.value);
	};

	const onUpdateTweetClicked = (e) => {
		e.preventDefault();
		setEditable((editable) => !editable);
		if (editTweet) {
			dispatch(
				tweetEdited({
					id: currentTweet.id,
					tweet: editTweet,
				}),
			);
		}
	};

	return (
		<div>
			{editable ? (
				<input
					value={editTweet}
					onChange={(e) => {
						onEditTweetChanged(e);
					}}
				/>
			) : (
				<p>{currentTweet.post}</p>
			)}
			{editable ? (
				<button
					onClick={(e) => {
						onUpdateTweetClicked(e);
					}}>
					Update Tweet
				</button>
			) : (
				<button
					onClick={(e) => {
						onEditClicked(e);
					}}>
					Edit
				</button>
			)}
		</div>
	);
};
