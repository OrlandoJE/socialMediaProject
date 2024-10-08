import { auth, provider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

export const Login = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const signUserInWithGoogle = async () => {
    await signInWithPopup(auth, provider);
    navigate('/');
  };

  const signUserOut = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <section className='flex flex-col gap-4 justify-center items-center text-center'>
      <h1>Login Page</h1>
      {user ? (
        <button
          onClick={signUserOut}
          className='w-48 bg-slate-200 border-2 border-slate-500 rounded-xl hover:bg-slate-50 duration-200'
        >
          Log Out
        </button>
      ) : (
        <button
          onClick={signUserInWithGoogle}
          className='w-48 bg-slate-200 border-2 border-slate-500 rounded-xl hover:bg-slate-50 duration-200'
        >
          Login with Google
        </button>
      )}
    </section>
  );
};
