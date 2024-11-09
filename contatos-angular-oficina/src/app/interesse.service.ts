import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Interesse } from './Interesse';

@Injectable({
  providedIn: 'root'
})
export class InteresseService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Interesse[]> {
    return this.http.get<Interesse[]>('http://localhost:8080/api/interesses');
  }
}
