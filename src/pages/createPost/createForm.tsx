import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';

interface CreateFormData {
  title: string;
  content: string;
}

export const CreateForm = () => {
  const [ user ] = useAuthState(auth);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    content: yup.string().required('Content is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, 'posts');

  const onCreatePost = async (data: CreateFormData) => {
    await addDoc(postsRef, {
      title: data.title,
      description: data.content,
      // Another way could be
      // ...data,

      username: user?.displayName,
      userId: user?.uid,
    });
    
    navigate('/');
  };

  return (
    <form
      onSubmit={handleSubmit(onCreatePost)}
      className='flex flex-col gap-4 justify-center items-center w-96 h-96 bg-cyan-100 rounded-xl'
    >
      <input
        autoComplete='off'
        className='border-2 w-64'
        placeholder='Title...'
        {...register('title')}
      />{' '}
      <p>{errors.title?.message}</p>
      <textarea
        className='border-2 w-72 h-32'
        placeholder='Content...'
        {...register('content')}
      />
      <p>{errors.content?.message}</p>
      <input
        className='border-2 w-24 bg-cyan-100 border-cyan-700 text-cyan-700 rounded-xl hover:bg-cyan-700 hover:border-cyan-100 hover:text-cyan-100 duration-200 cursor-pointer'
        type='submit'
      />
    </form>
  );
};
