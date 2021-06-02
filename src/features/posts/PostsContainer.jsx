import { PostForm } from './PostForm';
import { PostsList } from './PostsList';

export const PostsContainer = () => {
	return (
		<div className=''>
			<h2 className='text-2xl font-bold text-left border-b py-2'>Home</h2>
			<PostForm />
			<PostsList />
		</div>
	);
};
