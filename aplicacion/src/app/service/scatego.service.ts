import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Scatego } from 'src/model/scatego';

@Injectable({
  providedIn: 'root'
})
export class ScategoService {

  baseUrl:string = "http://localhost:3000/scategoria";

  constructor(private http:HttpClient) { }

  getAll() : Observable<any>{
    return this.http.get(this.baseUrl);
  }

  save(scatego: Scatego): Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(this.baseUrl +"/", JSON.stringify(scatego), {headers: headers});
  }

  delete(id:string) : Observable<any>{
    return this.http.delete(this.baseUrl +"/"+id);
  }

  getCatego(){
    return this.http.get("http://localhost:3000/categoria");

  }
  getFiltro(id:string){
    return this.http.get("http://localhost:3000/scategoria/"+id);

  }
}
