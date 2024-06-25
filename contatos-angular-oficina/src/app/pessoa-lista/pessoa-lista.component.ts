import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PessoaService } from '../pessoa.service';
import { Observable } from 'rxjs';
import { Pessoa } from '../Pessoa';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

type TipoAlerta = 'sucesso' | 'info' | 'erro';

type Alerta = {
  mensagem: string;
  tipo: TipoAlerta;
}

type ModalInfo = {
  mensagem: string;
  id: number;
}

@Component({
  selector: 'app-pessoa-lista',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pessoa-lista.component.html',
  styleUrl: './pessoa-lista.component.css'
})
export class PessoaListaComponent {

  listaPessoas$!: Observable<Pessoa[]>;

  alerta?: Alerta | null;

  modalInfo?: ModalInfo | null;

  private modalService = inject(NgbModal);

  constructor(private pessoaService: PessoaService, router: Router) {
    this.listaPessoas$ = pessoaService.findAll();
    this.alerta = router.getCurrentNavigation()?.extras.state as Alerta
  }

  convertIsoDateToDate(isoDate?: string): Date | undefined {
    if (isoDate) {
      return new Date(isoDate + 'T00:00:00');
    }
    return;
  }

  classeTipoAlerta(tipo: TipoAlerta): string {
    switch(tipo) {
      case 'sucesso':
        return 'alert-success';
      case 'erro':
        return 'alert-danger';
      case 'info':
        return 'alert-info';
    }
  }

  abrirModalExclusao(id: number, modalDelete: any): void {
    this.modalInfo = {
      mensagem: 'Confirma exclusão da pessoa ID ' + id + '?',
      id: id
    }
    this.modalService.open(modalDelete, { centered: true });
  }

  excluir(id: number) {
    this.pessoaService.delete(id).subscribe(() => {
      this.listaPessoas$ = this.pessoaService.findAll();
      this.modalService.dismissAll();
      this.alerta = {
        mensagem: 'Pessoa excluída com sucesso',
        tipo: 'sucesso'
      }
    });
  }

  fecharModal(): void {
    this.modalInfo = null;
  }

}
