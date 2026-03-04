import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Search from './pages/Seacrh';
import MovieDetails from './pages/MovieDetails';
import CategoryPage from './pages/CategoryPage';
import './App.css';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/movies" element={<CategoryPage />} />
        <Route path="/trending" element={<CategoryPage />} />
        <Route path="/top-rated" element={<CategoryPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/genre/:genreId" element={<CategoryPage />} />
      </Routes>
    </>
  );
};

export default App;
