import { Nav } from '../../Nav/Nav';
import { PostForm } from './PostForm';
import { PostsList } from './PostsList';

export const PostsContainer = () => {
	return (
		<div className='flex w-full items-start justify-center container'>
			<Nav />
			<div className='text-left w-full md:w-4/6 mb-20 md:mb-4 md:ml-10'>
				<h2 className='text-2xl font-bold text-left border-b py-2'>Home</h2>
				<PostForm />
				<PostsList />
			</div>
		</div>
	);
};
