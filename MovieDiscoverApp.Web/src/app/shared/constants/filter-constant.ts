export class FilterConstants {
    public static primaryReleaseYear = `primary_release_year`;
    public static includeAdult = `include_adult`;
    public static includeVideo = `include_video`;
    public static withGenres = `with_genres`;

    public static getQueryString(fieldName:string, value: string){
        return `&${fieldName}=${value}`;
    }
}
