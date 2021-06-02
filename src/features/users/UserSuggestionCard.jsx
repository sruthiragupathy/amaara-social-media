import { useDispatch } from 'react-redux';
import { followUser } from '../currentUser/currentUserSlice';
import { addCurrentUserToFollowersList } from './usersSlice';
import { isCurrentUserFollowing } from '../../utils/utils';
export const UserSuggestionCard = ({ user, currentUser }) => {
	const { _id, firstName, lastName, userName, bio } = user;
	const dispatch = useDispatch();
	const onFollowClicked = (e) => {
		e.preventDefault();
		dispatch(
			addCurrentUserToFollowersList({
				currentUserId: currentUser._id,
				followedUserId: _id,
			}),
		);
		dispatch(
			followUser({
				followedUserId: _id,
			}),
		);
	};
	return (
		<div className='flex items-start justify-start py-3 px-1 border-b hover:bg-gray-50'>
			<div className='img-logo uppercase'>
				{' '}
				{firstName[0]}
				{lastName[0]}
			</div>
			<div className='text-left w-full'>
				<div className='flex items-center justify-between mb-4'>
					<div className=''>
						<span className='text-gray-500 font-semibold text-l capitalize block'>
							{firstName} {lastName}
						</span>{' '}
						<span className='text-gray-400 text-sm'>@{userName}</span>
					</div>
					{!isCurrentUserFollowing(currentUser.following, user._id) ? (
						<button
							className='secondary-btn'
							onClick={(e) => onFollowClicked(e)}>
							Follow
						</button>
					) : (
						<button className='primary-btn' disabled>
							Following
						</button>
					)}
				</div>
				<div>{bio}</div>
			</div>
		</div>
	);
};
