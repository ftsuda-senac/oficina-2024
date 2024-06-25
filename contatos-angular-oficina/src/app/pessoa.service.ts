import { Injectable } from '@angular/core';
import { Pessoa } from './Pessoa';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private baseUrl = 'http://localhost:8080/api/pessoas';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.baseUrl);
  }

  findById(id: number): Observable<Pessoa | undefined> {
    return this.http.get<Pessoa>(this.baseUrl + `/${id}`);
  }

  addNew(pessoa: Pessoa): Observable<void> {
    return this.http.post<void>(this.baseUrl, pessoa);
  }

  update(id: number, pessoa: Pessoa): Observable<void> {
    return this.http.put<void>(this.baseUrl + `/${id}`, pessoa);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + `/${id}`);
  }
}
