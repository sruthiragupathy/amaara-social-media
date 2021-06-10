import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { cancelClicked, deleteTweet } from './postsSlice';

export const DeleteModal = ({ tweetId }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { status } = useSelector((state) => state.posts);
	const { token } = useSelector((state) => state.currentUser);

	const onDeleteClicked = async () => {
		await dispatch(deleteTweet({ tweetId, token }));

		navigate('/', { replace: true });
	};
	return (
		<div className='fixed top-1/2 left-1/2 transform -translate-x-2/4 -translate-y-1/2 z-20 bg-white w-4/5 p-4 md:w-1/2'>
			<h2 className='text-2xl font-semibold  border-b py-2 capitalize'>
				Delete Tweet
			</h2>
			<div className='h-24 border-b flex items-center text-lg'>
				Are you sure you want to delete the tweet?
			</div>
			<div className='flex justify-end mt-4'>
				<button
					className='cancel-btn mr-4'
					onClick={() => dispatch(cancelClicked())}>
					Cancel
				</button>
				<button className='delete-btn' onClick={onDeleteClicked}>
					Delete
				</button>
			</div>
		</div>
	);
};
