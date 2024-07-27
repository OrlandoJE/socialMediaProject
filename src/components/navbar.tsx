import { Link } from 'react-router-dom';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import noProfilePicture from '/noProfilePicture.webp';

export const Navbar = () => {
  const [user] = useAuthState(auth);
  return (
    <div className='flex flex-row justify-end text-center items-center gap-16 px-4 py-2 bg-cyan-100 mb-4'>
      <div className='flex flex-row gap-4 justify-center font-semibold text-cyan-900'>
        <Link
          to='/'
          className='hover:text-cyan-500 duration-200 border-b-4 border-cyan-900 hover:border-cyan-500'
        >
          Home
        </Link>
      </div>
      <Link
        to={'/login'}
        className='flex flex-row items-center gap-4 hover:text-cyan-500 duration-200'
      >
        <p className='hover:text-cyan-500 duration-200 border-b-4 border-cyan-900 hover:border-cyan-500'>
          Hi, {user?.displayName || 'Click to Log In'}
        </p>
        <img
          src={user?.photoURL || noProfilePicture}
          alt='profile'
          className='w-10 rounded-full'
        />
      </Link>
    </div>
  );
};
