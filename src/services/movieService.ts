import axios from "axios";

import type { Movie } from "../types/movie";

export async function fetchMovies(query: string): Promise<Movie[]> {
  const encodedQuery = encodeURIComponent(query.trim());

  if (!encodedQuery) return [];

  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          query: encodedQuery,
          language: "en-US",
          page: 1,
          include_adult: false,
        },
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          accept: "application/json",
        },
      },
    );

    const results = response.data.results || [];

    return results;
  } catch {
    return [];
  }
}
