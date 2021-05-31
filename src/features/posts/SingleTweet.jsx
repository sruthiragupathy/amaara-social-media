import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import { tweetEdited, tweetDeleted } from './postsSlice';

export const SingleTweet = () => {
	const { tweetId } = useParams();
	const [editable, setEditable] = useState(false);
	const [editTweet, setEditTweet] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const currentTweet = useSelector((state) => {
		return state.posts.find((post) => post.id === tweetId);
	});

	if (!currentTweet) {
		return <p>No posts Found</p>;
	}

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

	const onDeleteTweetClicked = (e) => {
		e.preventDefault();
		dispatch(
			tweetDeleted({
				id: currentTweet.id,
			}),
		);
		navigate('/');
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
			<button
				className='ml-4'
				onClick={(e) => {
					onDeleteTweetClicked(e);
				}}>
				Delete Tweet
			</button>
		</div>
	);
};
