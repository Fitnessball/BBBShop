import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtikelService {
  artikel: Array<any> = [];
  kategorie: Array<any> = [];
  constructor(private http: HttpClient) { }

  public setcounter(index:number,anzahl:number): Observable<any> {
     return this.http.post<any>('http://127.0.0.1:8080/setcounter', {index,anzahl});
   }

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

  public getkategorie(): Observable<any> {
    return new Observable(observer => {
      this.http.get('http://127.0.0.1:8080/loadkategorien').subscribe((data: any) => {
        this.kategorie = data;
        console.log(this.kategorie)
        observer.next(data);
        observer.complete();
      }, err => {
        observer.error(err);
        observer.complete();
      });
    });
  }

}
