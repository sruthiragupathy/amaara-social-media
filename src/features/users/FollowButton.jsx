import { useDispatch, useSelector } from 'react-redux';
import { isCurrentUserFollowing } from '../../utils/utils';
import { loadCurrentUser } from '../currentUser/currentUserSlice';
import { followButtonClicked } from './usersSlice';

export const FollowButton = ({ currentUser, user }) => {
	const dispatch = useDispatch();
	const { token } = useSelector((state) => state.currentUser);

	const onFollowButtonClicked = async (e) => {
		e.preventDefault();
		await dispatch(followButtonClicked({ followingUserId: user._id, token }));
		await dispatch(loadCurrentUser({ userName: currentUser.userName, token }));
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
