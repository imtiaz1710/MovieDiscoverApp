export class RouterConstants {
    static readonly basePath = 'localhost:4200';
    static readonly movies = "movies";
    static readonly apiKey = 'e97e8346683b49bfb765b16bf5c95c29';
    static readonly posterBaseUrl = `https://image.tmdb.org/t/p/w200`

    static getMovieDetailsPath(movieId: number){
        return `${this.movies}/${movieId}`;
    }
}


