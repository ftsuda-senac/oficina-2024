import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PessoaService } from '../pessoa.service';
import { InteresseService } from '../interesse.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Interesse } from '../Interesse';
import { Pessoa } from '../Pessoa';

@Component({
  selector: 'app-pessoa-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './pessoa-form.component.html',
  styleUrl: './pessoa-form.component.css'
})
export class PessoaFormComponent {

  pessoaId?: number;

  opcoesInteresses: (Interesse & {selecionado: boolean})[];

  dadosForm = new FormGroup({
    nome: new FormControl(''),
    email: new FormControl(''),
    dataNascimento: new FormControl('')
  });

  constructor (
    private pessoaService: PessoaService,
    private interesseService: InteresseService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.pessoaId = Number(this.route.snapshot.params['id']);
    this.opcoesInteresses = [];
    interesseService.findAll().subscribe(interesses => {
      for (const interesse of interesses) {
        this.opcoesInteresses.push({
          id: interesse.id,
          nome: interesse.nome,
          selecionado: false});
      }
    })
    if (this.pessoaId) {
      pessoaService.findById(this.pessoaId).subscribe(pessoa => {
        if (pessoa) {
          this.dadosForm.get('nome')?.setValue(pessoa.nome ?? '');
          this.dadosForm.get('email')?.setValue(pessoa.email ?? '');
          this.dadosForm.get('dataNascimento')?.setValue(pessoa.dataNascimento ?? '');
          const pessoaInteressesIds = pessoa.interesses?.map(interesse => interesse.id);
          for (const opInteresse of this.opcoesInteresses) {
            opInteresse.selecionado = pessoaInteressesIds?.includes(opInteresse.id) ?? false;
          }
        }
      })
    }
  }

  enviarDados(): void {
    const interessesSelecionados = this.opcoesInteresses.filter(opInteresse => opInteresse.selecionado === true).map(opInteresse => opInteresse.id);
    const pessoa : Pessoa = {
      nome: this.dadosForm.value.nome ?? '',
      email: this.dadosForm.value.email ?? '',
      dataNascimento: this.dadosForm.value.dataNascimento ?? '',
      interessesIds: interessesSelecionados
    }
    console.log(JSON.stringify(pessoa));
    if (this.pessoaId) {
      this.pessoaService.update(this.pessoaId, pessoa).subscribe(() => {
        this.router.navigate(['/pessoas'], { state: { mensagem: 'Pessoa atualizado com sucesso', tipo: 'sucesso' }});
      });
    } else {
      this.pessoaService.addNew(pessoa).subscribe(() => {
        this.router.navigate(['/pessoas'], { state: { mensagem: 'Pessoa cadastrada com sucesso', tipo: 'sucesso' }});
      });
    }


  }



}
