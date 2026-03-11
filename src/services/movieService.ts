import axios from "axios";
import type { Movie } from "../types/movie";

interface FetchMoviesParams {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const movieInstans = axios.create({
  baseURL: "https://api.themoviedb.org/3/search/movie",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});

export const fetchMovies = async (
  q: string = "",
  p: number = 1,
): Promise<FetchMoviesParams> => {
  const res = await movieInstans.get<FetchMoviesParams>("", {
    params: {
      query: q,
      page: p,
    },
  });

  // console.dir(res.data);
  return res.data;
};

export const BASE_URL_IMG = "https://image.tmdb.org/t/p/w500";
