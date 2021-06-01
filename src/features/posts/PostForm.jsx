import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { tweetPosted } from './postsSlice';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';

export const PostForm = () => {
	const [tweet, setTweet] = useState('');
	const onTweetChanged = (e) => {
		setTweet(e.target.value);
	};
	const dispatch = useDispatch();

	const onTweetPostClicked = (e) => {
		e.preventDefault();
		if (tweet) {
			dispatch(tweetPosted({ tweet }));
			setTweet('');
		}
	};

	return (
		<form onSubmit={(e) => onTweetPostClicked(e)}>
			<div className='flex items-start mt-4 border-b'>
				<div className='text-purple-700 font-semibold text-l rounded-full h-10 w-10 flex items-center justify-center mr-2 border-2 border-purple-700'>
					SR
				</div>
				<div className='w-full'>
					<textarea
						className='w-full py-1 px-2 h-20 outline-none border-b'
						placeholder='Add a tweet'
						value={tweet}
						onChange={(e) => onTweetChanged(e)}
					/>
					<div className='text-purple-700 flex justify-between items-center py-2'>
						<div>
							<ImageOutlinedIcon fontSize='large' color='inherit' />
						</div>
						<button
							type='submit'
							className='px-4 py-1 bg-purple-700 hover:bg-purple-800 text-gray-50 font-semibold rounded-2xl'>
							Tweet
						</button>
					</div>
				</div>
			</div>
		</form>
	);
};
