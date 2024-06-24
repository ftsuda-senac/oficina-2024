import { Injectable } from '@angular/core';
import { Interesse } from './interesse';

@Injectable({
  providedIn: 'root'
})
export class InteresseService {

  constructor() { }

  findAll(): Interesse[] {
    return [
      {
        id: 1,
        nome: 'Samba'
      },
      {
        id: 2,
        nome: 'Funk'
      },
      {
        id: 3,
        nome: 'Sertanejo'
      },
      {
        id: 4,
        nome: 'Gospel'
      }
    ]
  }
}
