import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {map} from 'rxjs/operators';

@Injectable()
export class getPostListService {
    constructor(private http: Http){
        /* console.log("Gettings users..."); */
    }
    getArticles(){
        return this.http.get("https://eirik.underbakke.net/api/getPostList.php")
        .pipe(map(res => res.json()));
    }
}