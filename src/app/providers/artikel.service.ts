import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtikelService {
  artikel: Array<any> = [];
  constructor(private http: HttpClient) { }

  public getartikel(): Observable<any> {
    return new Observable(observer => {
      this.http.get('http://127.0.0.1:8080/loadartikel').subscribe((data: any) => {
        this.artikel = data;
        console.log(this.artikel)
        observer.next(data);
        observer.complete();
      }, err => {
        observer.error(err);
        observer.complete();
      });
    });
  }
}
