import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { PostInterface } from './homepage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';

interface Props {
  post: PostInterface;
}

interface LikeInterface {
  userId: string;
  likeId: string;
}

export const Post = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);

  const [likes, setLikes] = useState<LikeInterface[] | null>(null);

  const likesRef = collection(db, 'likes');

  const likesDoc = query(likesRef, where('postId', '==', post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user?.uid, likeId: newDoc.id }]
            : [{ userId: user?.uid, likeId: newDoc.id }]
        );
      }
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where('postId', '==', post.id),
        where('userId', '==', user?.uid)
      );
      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, 'likes', likeId);
      await deleteDoc(likeToDelete);
      if (user) {
        setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId));
      }
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div className='mt-4 mb-8 border-b-2 border-cyan-700 w-[40rem]'>
      <div className='flex flex-row justify-between items-center'>
        <h2 className='font-medium'>{post.title}</h2>
        <p>@{post.username}</p>
      </div>
      <div>
        <p className='mb-2 text-balance'>{post.description}</p>
        <button
          className={`p-2 mb-1 rounded-2xl ${
            hasUserLiked && 'bg-cyan-100'
          }`}
          onClick={hasUserLiked ? removeLike : addLike}
        >
          &#128077; {likes ? likes.length : 0} Like{likes?.length === 1 ? '' : 's'}
        </button>
      </div>
    </div>
  );
};
