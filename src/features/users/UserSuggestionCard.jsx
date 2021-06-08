import { useSelector } from 'react-redux';
import { FollowButton } from './FollowButton';
import { NavLink } from 'react-router-dom';

export const UserSuggestionCard = ({ userProfile, currentUser }) => {
	const { firstName, lastName, userName, bio } = userProfile;

	return (
		<NavLink to={`/${userName}`}>
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
						<FollowButton currentUser={currentUser} user={userProfile} />
					</div>
					<div>
						A technology enthusiast👩‍💻 | Tweet about my learnings, tech and
						#151daysofcode | Learning full stack web development | Neogrammer
						@neogcamp
					</div>
				</div>
			</div>
		</NavLink>
	);
};
