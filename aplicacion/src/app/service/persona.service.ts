import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from 'src/model/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  baseUrl:string = "http://localhost:3000/scategoria";

  constructor(private http:HttpClient) { }

  getAll() : Observable<any>{
    return this.http.get(this.baseUrl);
  }

  save(persona: Persona): Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(this.baseUrl +"/", JSON.stringify(persona), {headers: headers});
  }

  delete(id: string) : Observable<any>{
    return this.http.delete(this.baseUrl + "/"+id);
  }
}
