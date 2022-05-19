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

export interface SEPMovieDetails {
    //     adult: false
    // backdrop_path:
    // belongs_to_collection: {id: 720879, name: 'Sonic the Hedgehog Collection', poster_path: '/rEC1pkQ1UbX7USRkVIrt2Nk7hlC.jpg', backdrop_path: '/8jfHKno4tRZ621Uzw4heEaJPgRM.jpg'}
    // budget: 110000000
    // genres: SEPGenre[]
    // homepage: "https://www.sonicthehedgehogmovie.com"
    // id: 675353
    // imdb_id: "tt12412888"
    // original_language: "en"
    // original_title: "Sonic the Hedgehog 2"
    // overview: "After settling in Green Hills, Sonic is eager to prove he has what it takes to be a true hero. His test comes when Dr. Robotnik returns, this time with a new partner, Knuckles, in search for an emerald that has the power to destroy civilizations. Sonic teams up with his own sidekick, Tails, and together they embark on a globe-trotting journey to find the emerald before it falls into the wrong hands."
    // popularity: 6852.303
    // poster_path: "/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg"
    // production_companies: (5) [{…}, {…}, {…}, {…}, {…}]
    // production_countries: (2) [{…}, {…}]
    // release_date: "2022-03-30"
    // revenue: 355200000
    // runtime: 122
    // spoken_languages: (2) [{…}, {…}]
    // status: "Released"
    // tagline: "Welcome to the next level."
    // title: "Sonic the Hedgehog 2"
    // video: false
    // vote_average: 7.7
    // vote_count: 1459
}

export interface SEPGenre {
    id: number;
    name: string;
}
