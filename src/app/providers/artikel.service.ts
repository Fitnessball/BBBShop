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

  public insertArtikel(a_nr:number,r_nr:number,artikel:string,kategorie:string,anzahl:number,gebinde:string): Observable<any> {
    //console.log(ticket_nr,kunden_id,veranstaltungs_nr,erwachsene,ermaessigte,kinder)
     return this.http.post<any>('http://127.0.0.1:8080/insertartikel', {a_nr,r_nr,artikel,kategorie,anzahl,gebinde});
   }

  public setcounter(index:number,anzahl:number): Observable<any> {
     return this.http.post<any>('http://127.0.0.1:8080/setcounter', {index,anzahl});
   }

   public setedit(a_nr:number,r_nr:number,artikel:string,kategorie:string,anzahl:number,gebinde:string): Observable<any> {
    //console.log(ticket_nr,kunden_id,veranstaltungs_nr,erwachsene,ermaessigte,kinder)
     return this.http.post<any>('http://127.0.0.1:8080/setedit', {a_nr,r_nr,artikel,kategorie,anzahl,gebinde});
   }

   
   public resetcounter(anzahl:number): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8080/resetcounter', {anzahl});
  }

  public getartikel(): Observable<any> {
    return new Observable(observer => {
      this.http.get('http://127.0.0.1:8080/loadartikel').subscribe((data: any) => {
        this.artikel = data;
        // console.log(this.artikel)
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
        // console.log(this.kategorie)
        observer.next(data);
        observer.complete();
      }, err => {
        observer.error(err);
        observer.complete();
      });
    });
  }

  login(user_name: string, user_passwort: string): Observable<any> {
    return new Observable(observer => {
      this.http.post<any>('http://127.0.0.1:8080/loginaut', { user_name, user_passwort }).subscribe(
        (response: any) => {
          if (response.success) {
            observer.next(response); // Erfolgreiche Antwort weiterleiten
          } else {
            observer.next(response); // Fehlermeldung weiterleiten
          }
          observer.complete();
        },
        (error) => {
          observer.error(error); // Netzwerkfehler oder andere Fehler behandeln
          observer.complete();
        }
      );
    });
  }


}



