import { Nav } from '../../Nav/Nav';
import { PostForm } from './PostForm';
import { PostsList } from './PostsList';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadPosts } from './postsSlice';
import { statusEnum } from '../../utils';

export const PostsContainer = () => {
	const { tweets, status } = useSelector((state) => state.posts);
	const { token } = useSelector((state) => state.currentUser);
	const dispatch = useDispatch();
	useEffect(() => {
		if (status.LOAD_POSTS === statusEnum['IDLE'])
			dispatch(loadPosts({ token }));
	}, []);
	return (
		<div className='flex w-full items-start justify-center container'>
			<Nav />
			{tweets ? (
				<div className='text-left w-full md:w-4/6 mb-20 md:mb-4 md:ml-10'>
					<h2 className='text-2xl font-bold text-left border-b py-2'>Home</h2>
					<PostForm />
					<PostsList />
				</div>
			) : (
				<div className='text-left w-full md:w-4/6 md:ml-10 min-h-screen flex items-center justify-center'>
					<CircularProgress />
				</div>
			)}
		</div>
	);
};
