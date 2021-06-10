import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Nav = () => {
	const {
		currentUser: { userName },
	} = useSelector((state) => state.currentUser);
	return (
		<div className='text-gray-500 flex bg-gray-100 md:bg-white fixed w-full bottom-0 md:relative  md:flex-col items-start md:justify-center md:w-1/12 justify-between'>
			<NavLink to='/' end className='p-4' activeClassName='text-purple-700'>
				<HomeIcon fontSize='large' />
			</NavLink>
			<NavLink
				to='/connect'
				end
				className='p-4'
				activeClassName='text-purple-700'>
				<ExploreIcon fontSize='large' />
			</NavLink>
			<NavLink
				to={`/${userName}`}
				className='p-4'
				activeClassName='text-purple-700'>
				<AccountCircleRoundedIcon fontSize='large' />
			</NavLink>
			<NavLink to='/' className='img-logo md:ml-3 my-3 text-2xl'>
				+
			</NavLink>
		</div>
	);
};
