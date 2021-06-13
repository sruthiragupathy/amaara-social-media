import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { formValidation } from '../../utils';
import { loginUser, resetError } from './currentUserSlice';

export const Login = () => {
	const [user, setUser] = useState({
		email: '',
		password: '',
	});
	const [formError, setFormError] = useState({
		email: '',
		password: '',
	});

	const { error } = useSelector((state) => state.currentUser);
	const dispatch = useDispatch();
	const onUserChanged = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const onLoginClicked = async (e) => {
		console.log('hello');
		e.preventDefault();
		dispatch(resetError());
		if (formValidation(user.email, user.password, formError, setFormError)) {
			console.log('hi');
			await dispatch(loginUser({ email: user.email, password: user.password }));
		}
	};

	return (
		<div className='flex justify-between min-h-screen'>
			<div className='hidden md:block w-1/3 bg-purple-100 h-screen flex flex-col items-start justify-center py-10 px-6 text-gray-600'>
				<div className='font-bold mb-6 text-lg italic'>Amaara Spaces</div>
				<div className='font-bold text-xl'>
					Discover your passion around fashion
				</div>
			</div>
			<div className='flex flex-col items-start mx-4 justify-center w-full md:w-1/2 text-gray-500'>
				<h2 className='font-semibold text-2xl mb-6 '>
					Sign in to Amaara Spaces
				</h2>
				<form
					className='flex flex-col w-full items-start '
					onSubmit={(e) => onLoginClicked(e)}>
					<div className='mb-6 md:w-9/12 w-full'>
						<label className='mb-2 font-semibold block'>Email Address</label>
						<input
							placeholder='Email Address'
							type='text'
							value={user.email}
							name='email'
							onChange={(e) => onUserChanged(e)}
							className='px-3 py-2 w-full 
						 border focus:outline-none focus:ring focus:border-purple-700'
						/>
						{formError.email && (
							<span className='block font-semibold font-sm text-red-600'>
								*{formError.email}
							</span>
						)}
					</div>
					<div className='mb-6 md:w-9/12 w-full'>
						<label className='mb-2 font-semibold block font-sm'>Password</label>

						<input
							placeholder='Password'
							type='password'
							value={user.password}
							name='password'
							onChange={(e) => onUserChanged(e)}
							className='px-3 py-2 w-full 
						 border focus:outline-none focus:ring focus:border-purple-700'
						/>
						{formError.password && (
							<span className='block font-semibold text-red-600'>
								*{formError.password}
							</span>
						)}
					</div>
					<button
						className='bg-purple-700 hover:bg-purple-800 p-2 md:w-9/12 w-full text-white font-semibold mb-2'
						type='submit'>
						LOGIN
					</button>
					<div className='font-medium text-md'>
						Not a member?{' '}
						<NavLink
							to='/signup'
							className='text-purple-700 underline font-bold'>
							Sign Up
						</NavLink>
					</div>
					<div className='mt-2 text-red-600 font-semibold text-xl'>{error}</div>
				</form>
			</div>
		</div>
	);
};
