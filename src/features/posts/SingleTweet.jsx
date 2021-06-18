import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import {
	transformISOString,
	reactionEmoji,
	statusEnum,
} from '../../utils/utils';
import {
	deleteIconClicked,
	loadCurrentTweet,
	editIconClicked,
} from './postsSlice';
import { ReactionButtons } from './ReactionButtons';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { PostModal } from './PostModal';
import { DeleteModal } from './DeleteModal';
import { Nav } from '../../Nav/Nav';
import CircularProgress from '@material-ui/core/CircularProgress';

export const SingleTweet = () => {
	const { tweetId } = useParams();
	const dispatch = useDispatch();
	const { currentTweet, status, editable, deletable } = useSelector(
		(state) => state.posts,
	);
	const { currentUser, token } = useSelector((state) => state.currentUser);
	const { userId, tweet, createdAt } = currentTweet;

	useEffect(() => {
		dispatch(loadCurrentTweet({ tweetId, token }));
	}, []);

	const getLikesCount = () => {
		return Object.keys(reactionEmoji).reduce((acc, element) => {
			return acc + currentTweet[element].reactedUsers.length;
		}, 0);
	};

	return (
		<div className='flex w-full items-start justify-center container'>
			<Nav />
			{status.LOAD_CURRENT_TWEET === statusEnum['SUCCESS'] ? (
				<div className='text-left w-full md:w-4/6 md:ml-10'>
					{(editable || deletable) && (
						<div className='inset-0  bg-gray-800 opacity-50 fixed z-20'></div>
					)}
					<h2 className='text-2xl font-semibold  border-b py-2 capitalize'>
						Tweet
					</h2>
					<div className='py-4 border-b'>
						<div className='flex items-center justify-start text-left mb-4'>
							<NavLink to={`/`}>
								<div className='img-logo uppercase'>
									{userId.firstName[0]}
									{userId.lastName[0]}
								</div>
							</NavLink>
							<div className='flex justify-between w-full'>
								<div>
									<NavLink to={`/${userId.userName}`}>
										<h3 className='text-gray-500 font-semibold text-lg capitalize md:hover:underline'>
											{userId.firstName} {userId.lastName}
										</h3>
									</NavLink>
									<NavLink to={`/${userId.userName}`}>
										<h3 className='text-gray-400 text-md md:hover:underline'>
											{userId.userName}
										</h3>
									</NavLink>
								</div>
								{userId._id === currentUser._id && (
									<div className='text-gray-400'>
										<button
											onClick={() => dispatch(editIconClicked({ tweetId }))}
											className='text-purple-700 mr-4'>
											<EditIcon color='inherit' />
										</button>

										<button
											className='text-red-600'
											onClick={() => dispatch(deleteIconClicked({ tweetId }))}>
											<DeleteIcon color='inherit' />
										</button>
									</div>
								)}
							</div>
						</div>
						<div className='mb-4 whitespace-pre-line'>{tweet}</div>
						<div className='text-gray-400 text-sm'>
							{transformISOString(createdAt)}
						</div>
					</div>
					<div>
						<div className='border-b py-3 capitalize'>
							<span className='font-semibold'>{getLikesCount()} </span>
							<span className='text-gray-400'>Reactions</span>
						</div>
					</div>
					<ReactionButtons
						tweetObj={currentTweet}
						currentUserId={currentUser._id}
					/>
					{editable === tweetId && <PostModal tweet={tweet} />}
					{deletable === tweetId && <DeleteModal tweetId={tweetId} />}
				</div>
			) : (
				<div className='text-left w-full md:w-4/6 md:ml-10 min-h-screen flex items-center justify-center'>
					<CircularProgress />
				</div>
			)}
		</div>
	);
};
