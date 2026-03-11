import { useState } from "react";
import toast from "react-hot-toast";
import { SearchBar } from "../SearchBar/SearchBar";
import { MovieGrid } from "../MovieGrid/MovieGrid";
import css from "./App.module.css";
import { Loader } from "../Loader/Loader";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { BASE_URL_IMG, fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import { MovieModal } from "../MovieModal/MovieModal";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectMovie, setSelectMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectMovie(null);
  };

  const handleSearch = async (userQuery: string) => {
    setMovies([]);
    setIsError(false);
    setIsLoader(true);
    try {
      const res = await fetchMovies(userQuery);
      if (res.results.length === 0) {
        toast.error("No movies found for your request.");
      } else {
        setMovies([...res.results]);
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoader(false);
    }
  };
  const handleClick = (mov: Movie) => {
    openModal();
    setSelectMovie(mov);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      <MovieGrid
        movies={movies}
        onSelect={handleClick}
        urlForImg={BASE_URL_IMG}
      />
      {isLoader && <Loader />}
      {isError && <ErrorMessage />}
      {isModalOpen && (
        <MovieModal
          onClose={closeModal}
          movie={selectMovie as Movie}
          urlForImg={BASE_URL_IMG}
        />
      )}
    </div>
  );
}

export default App;
