export interface SEPMovie {
  id: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | undefined;
  popularity: number;
  vote_count: number;
  video: boolean;
  vode_average: number;
  poster_path: string | undefined;
}

export interface SEPList<T> {
  page: number;
  results: T[];
  total_results: number;
  total_pages: number;
}

export interface SEPQueryParam {
  name: string;
  value: string;
}
