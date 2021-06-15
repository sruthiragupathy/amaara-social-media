import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	cancelEditClicked,
	updateProfile,
} from '../currentUser/currentUserSlice';
import { getUserProfileByUserName } from './usersSlice';

export const EditModal = () => {
	const dispatch = useDispatch();
	const { token, currentUser } = useSelector((state) => state.currentUser);
	const [bio, setBio] = useState(currentUser.bio);

	const onUpdateClicked = async () => {
		bio && (await dispatch(updateProfile({ token, bio })));
		dispatch(
			getUserProfileByUserName({ userName: currentUser.userName, token }),
		);
	};

	return (
		<div className='fixed top-1/2 left-1/2 transform -translate-x-2/4 -translate-y-1/2 z-20 bg-white w-4/5 p-4 md:w-1/2'>
			<h2 className='text-2xl font-semibold  border-b py-2 capitalize'>
				Edit Profile
			</h2>
			<div className='h-24 border-b flex items-center text-lg'>
				<span>UserName</span>{' '}
				<span className='justify-self-start'>{currentUser.userName}</span>
			</div>
			<div className='h-24 border-b flex items-center text-lg'>
				<span>FullName</span>{' '}
				<span className='capitalize justify-self-start'>
					{currentUser.firstName} {currentUser.lastName}
				</span>
			</div>
			<div className='h-24 border-b flex items-center text-lg'>
				<span>Email</span> <span>{currentUser.email}</span>
			</div>
			<div className='h-24 border-b flex items-center text-lg'>
				<span>Bio</span>
				<input
					value={bio}
					name='bio'
					autoFocus
					className='border-b-2 border-purpe-500 p-2'
					onChange={(e) => setBio(e.target.value)}
				/>
			</div>
			<div className='flex justify-end mt-4'>
				<button
					className='cancel-btn mr-4'
					onClick={() => dispatch(cancelEditClicked())}>
					Cancel
				</button>
				<button className='primary-btn-square' onClick={onUpdateClicked}>
					Update
				</button>
			</div>
		</div>
	);
};
