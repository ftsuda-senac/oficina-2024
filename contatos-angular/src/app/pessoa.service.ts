import { Injectable } from '@angular/core';
import  { Pessoa } from './pessoa';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private contador: number = 100;

  private PESSOAS: Pessoa[] = [
    {
      id: ++this.contador,
      nome: 'Fulano da Silva',
      email: 'fulano@email.com.br',
      dataNascimento: '2000-10-20',
      interesses: []
    },
    {
      id: ++this.contador,
      nome: 'Ciclano de Souza',
      email: 'ciclano@email.com',
      dataNascimento: '2001-05-15',
      interesses: []
    },
    {
      id: ++this.contador,
      nome: 'Beltrana dos Santos',
      email: 'beltrana@email.com',
      dataNascimento: '1999-08-21',
      interesses: []
    }
  ];

  constructor() {

  }

  findAllPessoas(): Pessoa[] {
    return this.PESSOAS;
  }

  findById(id: number): Pessoa | undefined {
    return this.PESSOAS.filter((pessoa) => pessoa.id === id)[0];
  }

  addNew(pessoa: Pessoa): void {
    pessoa = {...pessoa, id: ++this.contador}
    this.PESSOAS.push(pessoa);
  }

  update(id: number, pessoa: Pessoa): void {
    this.PESSOAS = this.PESSOAS.map((pessoaExistente) => {
      if (pessoaExistente.id !== id) {
        return pessoaExistente;
      }
      return { ...pessoa, id };
    });
  }

  remove(id: number): void {
    const idx = this.PESSOAS.map((pessoa) => pessoa.id).indexOf(id);
    this.PESSOAS.splice(0, idx);
  }

}
