import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";

interface MovieGridProps {
  onSelect: (mov: Movie) => void;
  movies: Movie[];
  urlForImg: string;
}

export function MovieGrid({ onSelect, movies, urlForImg }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map(
        ({
          id,
          poster_path,
          backdrop_path,
          title,
          overview,
          release_date,
          vote_average,
        }) => {
          return (
            <li
              key={id}
              onClick={() => {
                onSelect({
                  id,
                  poster_path,
                  backdrop_path,
                  title,
                  overview,
                  release_date,
                  vote_average,
                });
              }}
            >
              <div className={css.card}>
                <img
                  className={css.image}
                  src={urlForImg + poster_path}
                  alt={title}
                  loading="lazy"
                />
                <h2 className={css.title}>{title}</h2>
              </div>
            </li>
          );
        },
      )}
    </ul>
  );
}
