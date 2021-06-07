import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postTweet } from './postsSlice';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';

export const PostForm = () => {
	const [tweet, setTweet] = useState('');
	const { currentUser } = useSelector((state) => state.currentUser);
	console.log({ currentUser });
	const onTweetChanged = (e) => {
		setTweet(e.target.value);
	};
	const dispatch = useDispatch();

	const onTweetPostClicked = (e) => {
		e.preventDefault();
		if (tweet) {
			dispatch(postTweet({ tweet }));
			setTweet('');
		}
	};

	return (
		<form onSubmit={(e) => onTweetPostClicked(e)}>
			<div className='flex px-1 items-start mt-4 border-b'>
				<div className='img-logo'>
					{currentUser?.firstName[0]}
					{currentUser?.lastName[0]}
				</div>
				<div className='w-full'>
					<div className=''>
						<textarea
							className='w-full py-1 px-2 h-24 outline-none border-b'
							placeholder='Add a tweet'
							value={tweet}
							onChange={(e) => onTweetChanged(e)}
						/>
					</div>
					<div className='text-purple-700 flex justify-between items-center pb-2'>
						<div>
							<ImageOutlinedIcon fontSize='large' color='inherit' />
						</div>
						<button
							type='submit'
							className={`primary-btn ${
								tweet.length === 0 ? 'opacity-50' : ''
							}`}
							disabled={tweet.length === 0}>
							Tweet
						</button>
					</div>
				</div>
			</div>
		</form>
	);
};
