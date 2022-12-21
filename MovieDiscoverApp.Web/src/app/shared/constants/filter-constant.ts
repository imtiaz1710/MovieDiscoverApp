export class FilterConstants {
    static primaryReleaseYear = `primary_release_year`;
    static includeAdult = `include_adult`;
    static includeVideo = `include_video`;
    static withGenres = `with_genres`;

    static getQueryString(fieldName:string, value: string){
        return `&${fieldName}=${value}`;
    }
}