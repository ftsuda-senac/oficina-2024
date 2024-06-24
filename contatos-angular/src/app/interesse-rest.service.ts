import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Interesse } from './interesse';

@Injectable({
  providedIn: 'root'
})
export class InteresseRestService {

  baseUrl = 'http://localhost:8080/api/interesses';

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<Interesse[]> {
    return this.http.get<Interesse[]>(this.baseUrl);
  }

}
