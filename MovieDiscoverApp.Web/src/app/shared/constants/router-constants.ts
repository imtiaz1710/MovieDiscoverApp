export class RouterConstants {
    public static readonly appBasePath = 'localhost:4200';
    public static readonly movies = "movies";
    public static readonly apiKey = 'e97e8346683b49bfb765b16bf5c95c29';
    public static readonly posterBaseUrl = `https://image.tmdb.org/t/p/w200`

    public static getMovieDetailsPath(movieId: number){
        return `${this.movies}/${movieId}`;
    }

    public static generateFullImageUrl(fileName: string){
        return `${RouterConstants.posterBaseUrl}/${fileName}`;
    }
}


