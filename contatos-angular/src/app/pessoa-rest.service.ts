import { Injectable } from '@angular/core';;
import { HttpClient, HttpHeaders } from '@angular/common/http';

import  { Pessoa } from './pessoa';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoaRestService {

  baseUrl = 'http://localhost:8080/api/pessoas';

  constructor(private http: HttpClient) {
    // This service can now make HTTP requests via `this.http`.
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  findAllPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.baseUrl);
  }

  findById(id: number): Observable<Pessoa | undefined> {
    return this.http.get<Pessoa>(this.baseUrl + `/${id}`);
  }

  addNew(pessoa: Pessoa): Observable<void> {
    return this.http.post<void>(this.baseUrl, pessoa, this.httpOptions);
  }

  update(id: number, pessoa: Pessoa): Observable<void>  {
    return this.http.put<void>(this.baseUrl + `/${id}`, pessoa, this.httpOptions);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + `/${id}`);
  }

}
