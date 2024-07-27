import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Homepage } from './pages/homepage/homepage.tsx';
import { Login } from './pages/login';
import { Navbar } from './components/navbar';
import { CreatePost } from './pages/createPost/createPost.tsx';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/createpost' element={<CreatePost />} />
        <Route path='*' element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
