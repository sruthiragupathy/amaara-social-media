import { NavLink } from 'react-router-dom';

export const FollowNav = ({ userName }) => {
	return (
		<nav className='mt-3 text-lg flex justify-start border-b'>
			<NavLink
				to={`/${userName}/following`}
				className='p-2 mr-6'
				activeClassName='text-purple-700 border-b-2 border-purple-700 font-semibold'>
				Following
			</NavLink>
			<NavLink
				to={`/${userName}/followers`}
				className='p-2'
				activeClassName='text-purple-700 border-b-2 border-purple-700 font-semibold'>
				Followers
			</NavLink>
		</nav>
	);
};
