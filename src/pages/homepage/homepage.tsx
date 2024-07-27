import { Link } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useEffect, useState } from 'react';
import { Post } from './post';

export interface PostInterface {
  id: string;
  userId: string;
  title: string;
  username: string;
  description: string;
}

export const Homepage = () => {
  const [user] = useAuthState(auth);
  const [postsList, setPostsList] = useState<PostInterface[] | null>(null);
  const postsRef = collection(db, 'posts');

  const getPosts = async () => {
    const posts = await getDocs(postsRef);
    setPostsList(
      posts.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as PostInterface[]
    );
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <section className='flex flex-col justify-center items-center'>
      <h1 className='flex justify-center w-full mb-2'>Homepage</h1>
      {user && (
        <Link to={'/createpost'}>
          <h2 className='hover:text-cyan-500 duration-200 border-b-4 border-cyan-900 hover:border-cyan-500 mb-4'>
            Create Post
          </h2>
        </Link>
      )}
      <div>
        {postsList?.map((post) => (
          <Post post={post} />
        ))}
      </div>
    </section>
  );
};
