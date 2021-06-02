import { useDispatch } from 'react-redux';
import { updateCurrentUserFollowing } from '../currentUser/currentUserSlice';
import { followClicked } from './usersSlice';
import { isCurrentUserFollowing } from '../../utils/utils';
export const FollowButton = ({ currentUser, user }) => {
	const { _id } = user;
	const dispatch = useDispatch();
	const onFollowClicked = (e) => {
		e.preventDefault();
		dispatch(
			followClicked({
				currentUserId: currentUser._id,
				followedUserId: _id,
			}),
		);
		dispatch(
			updateCurrentUserFollowing({
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
