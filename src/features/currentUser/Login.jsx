import { NavLink } from 'react-router-dom';

export const Login = () => {
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
				<form className='flex flex-col w-full items-start '>
					<label className='mb-2 font-semibold'>Email Address</label>
					<input
						placeholder='Email Address'
						type='text'
						className='px-3 py-2 w-full md:w-9/12 mb-6
						 border focus:outline-none focus:ring focus:border-purple-700'
					/>
					<label className='mb-2 font-semibold'>Password</label>

					<input
						placeholder='Password'
						type='password'
						className='px-3 py-2 w-full md:w-9/12 mb-6 border focus:outline-none focus:ring
					focus:border-purple-700'
					/>
					<button className='bg-purple-700 hover:bg-purple-800 p-2 w-9/12 text-white font-semibold mb-2'>
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
				</form>
			</div>
		</div>
	);
};
