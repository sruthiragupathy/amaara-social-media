import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { UserSuggestionCard } from './UserSuggestionCard';

export const ConnectToPeople = () => {
	const { users } = useSelector((state) => state.users);
	const { currentUser } = useSelector((state) => state.currentUser);
	return (
		<div>
			{users.map((user) => {
				return currentUser._id !== user._id ? (
					<NavLink to={`/${user.userName}`}>
						<UserSuggestionCard userProfile={user} currentUser={currentUser} />
					</NavLink>
				) : null;
			})}
		</div>
	);
};
