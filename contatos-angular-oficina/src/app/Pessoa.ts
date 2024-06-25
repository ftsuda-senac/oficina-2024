import { Interesse } from "./Interesse";

export interface Pessoa {
  id?: number;
  nome: string;
  email: string;
  dataNascimento: string;
  interesses?: Interesse[];
  interessesIds: number[];
}
