import { useDispatch } from 'react-redux';
import { followUser } from '../currentUser/currentUserSlice';
import { addCurrentUserToFollowersList } from './usersSlice';
import { isCurrentUserFollowing } from '../../utils/utils';
export const FollowButton = ({ currentUser, user }) => {
	const { _id } = user;
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
		<>
			{!isCurrentUserFollowing(currentUser.following, user._id) ? (
				<button className='secondary-btn' onClick={(e) => onFollowClicked(e)}>
					Follow
				</button>
			) : (
				<button className='primary-btn' disabled>
					Following
				</button>
			)}
		</>
	);
};
