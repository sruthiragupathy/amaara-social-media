import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

export const SingleTweet = () => {
	const { tweetId } = useParams();
	console.log({ tweetId });

	const currentTweet = useSelector((state) => {
		console.log(state.post);
		return state.posts.find((post) => post.id === tweetId);
	});

	return <p>{currentTweet.post}</p>;
};
