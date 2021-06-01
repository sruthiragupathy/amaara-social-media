import { PostForm } from './PostForm';
import { PostsList } from './PostsList';

export const PostsContainer = () => {
	return (
		<div className='md:w-9/12 md:m-auto my-2 mx-2'>
			<h2 className='text-2xl font-bold text-left border-b py-2'>Home</h2>
			<PostForm />
			<PostsList />
		</div>
	);
};
