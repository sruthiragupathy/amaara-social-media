import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { resetToken } from '../features/currentUser/currentUserSlice';

export const Nav = () => {
	const {
		currentUser: { userName },
	} = useSelector((state) => state.currentUser);
	const dispatch = useDispatch();
	const onSignOutClicked = async () => {
		await localStorage?.removeItem('logincredentials');
		dispatch(resetToken());
	};

	return (
		<div className='md:sticky fixed bottom-0 flex md:flex-col md:top-0 md:justify-start justify-between  w-full md:w-20 bg-white'>
			<NavLink to='/' end className='py-4' activeClassName='text-purple-700'>
				<HomeIcon fontSize='large' />
			</NavLink>
			<NavLink
				to='/connect'
				end
				className='py-4'
				activeClassName='text-purple-700'>
				<ExploreIcon fontSize='large' />
			</NavLink>
			<NavLink to='/' className='img-logo md:ml-3 my-3 text-2xl md:hidden'>
				+
			</NavLink>
			<NavLink
				to={`/${userName}`}
				className='py-4'
				activeClassName='text-purple-700'>
				<AccountCircleRoundedIcon fontSize='large' />
			</NavLink>
			<button
				to={`/${userName}`}
				className='py-4'
				activeClassName='text-purple-700'
				onClick={onSignOutClicked}>
				<ExitToAppIcon fontSize='large' />
			</button>
			<NavLink to='/' className='img-logo md:ml-3 my-3 text-2xl hidden md:flex'>
				+
			</NavLink>
		</div>
	);
};
