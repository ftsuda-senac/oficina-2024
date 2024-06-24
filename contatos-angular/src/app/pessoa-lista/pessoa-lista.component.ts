import { Component, TemplateRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PessoaService } from '../pessoa.service';
import { Pessoa } from '../pessoa';
import { PessoaRestService } from '../pessoa-rest.service';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

type Alerta = {
  mensagem: string,
  tipo: 'sucesso' | 'erro' | 'info'
}

type ModalInfo = {
  mensagem: string,
  id: number
}

@Component({
  selector: 'app-pessoa-lista',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pessoa-lista.component.html',
  styleUrl: './pessoa-lista.component.css'
})
export class PessoaListaComponent {

  // listaPessoas: Pessoa[] = [];

  // constructor(private pessoaService: PessoaService) {
  //   this.listaPessoas = this.pessoaService.findAllPessoas();
  // }


  listaPessoas$!: Observable<Pessoa[]>;

  alerta?: Alerta | null;

  modalInfo?: ModalInfo | null;

  private modalService = inject(NgbModal);

  constructor(private pessoaService: PessoaRestService, router: Router) {
    this.listaPessoas$ = this.pessoaService.findAllPessoas(); // $ no final é convençao do angular para indicar que é Observable
    this.alerta = router.getCurrentNavigation()?.extras.state as Alerta
  }

  convertIsoDateToDate(isoDate?: string): Date | undefined {
    if (isoDate) {
      return new Date(isoDate + 'T00:00:00');
    }
    return;
  }

  obterAlertaClass(tipo: 'sucesso' | 'erro' | 'info'): string {
    switch(tipo) {
      case 'sucesso':
        return 'alert-success';
      case 'erro':
        return 'alert-error';
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
    this.pessoaService.remove(id).subscribe(() => {
      this.listaPessoas$ = this.pessoaService.findAllPessoas();
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
