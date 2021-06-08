import { useDispatch } from 'react-redux';
import { isCurrentUserFollowing } from '../../utils/utils';
import { loadCurrentUser } from '../currentUser/currentUserSlice';
import { followButtonClicked } from './usersSlice';

export const FollowButton = ({ currentUser, user }) => {
	const dispatch = useDispatch();

	const onFollowButtonClicked = async (e) => {
		e.preventDefault();
		await dispatch(followButtonClicked({ followingUserId: user._id }));
		await dispatch(loadCurrentUser());
	};
	return (
		<>
			{!isCurrentUserFollowing(currentUser.followingList, user._id) ? (
				<button
					className='secondary-btn'
					onClick={(e) => onFollowButtonClicked(e)}>
					Follow
				</button>
			) : (
				<button
					className='primary-btn'
					onClick={(e) => onFollowButtonClicked(e)}>
					Following
				</button>
			)}
		</>
	);
};
