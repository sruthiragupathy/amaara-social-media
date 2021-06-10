import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { updateTweet, cancelClicked } from './postsSlice';

export const PostModal = ({ tweet }) => {
	const [editTweet, setEditTweet] = useState(tweet);
	const { tweetId } = useParams();
	const { token } = useSelector((state) => state.currentUser);
	const dispatch = useDispatch();
	const onUpdateClicked = () => {
		dispatch(updateTweet({ tweetId, editTweet, token }));
	};
	const onCancelClicked = () => {
		dispatch(cancelClicked());
	};
	return (
		<div className='fixed top-1/2 left-1/2 transform -translate-x-2/4 -translate-y-1/2 z-20 bg-white w-4/5 p-4 md:w-1/2'>
			<h2 className='text-2xl font-semibold  border-b py-2 capitalize'>
				Update Tweet
			</h2>
			<textarea
				className='w-full py-1 px-2 h-24 outline-none border-b-2 border-purple-700'
				placeholder='Add a tweet'
				value={editTweet}
				onChange={(e) => setEditTweet(e.target.value)}
				autoFocus
			/>
			<div className='flex justify-end mt-3'>
				<button className='cancel-btn mr-4' onClick={onCancelClicked}>
					Cancel
				</button>
				<button
					className={`primary-btn-square ${
						editTweet === tweet ? 'opacity-50' : ''
					}`}
					onClick={onUpdateClicked}
					disabled={editTweet === tweet}>
					Update
				</button>
			</div>
		</div>
	);
};
