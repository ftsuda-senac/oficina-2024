import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PessoaService } from '../pessoa.service';
import { Pessoa } from '../pessoa';
import { InteresseService } from '../interesse.service';
import { Interesse } from '../interesse';
import { InteresseRestService } from '../interesse-rest.service';
import { Observable } from 'rxjs';
import { PessoaRestService } from '../pessoa-rest.service';


@Component({
  selector: 'app-pessoa-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './pessoa-form.component.html',
  styleUrl: './pessoa-form.component.css'
})
export class PessoaFormComponent implements OnInit {

  // pessoaId?: number;

  // pessoa?: Pessoa;

  // dataNascimento?: Date;

  // interesses: Map<number, boolean> = new Map();

  // opcoesInteresses: Interesse[];

  // dadosForm = new FormGroup({
  //   nome: new FormControl(''),
  //   email: new FormControl(''),
  //   dataNascimento: new FormControl(''),
  //   interesses: new FormControl([])
  // });

  // constructor(
  //     private pessoaService: PessoaService,
  //     interesseService: InteresseService,
  //     private route: ActivatedRoute) {
  //   this.pessoaId = Number(this.route.snapshot.params['id']);
  //   this.opcoesInteresses = interesseService.findAll();
  // }

  // ngOnInit(): void {
  //   if (this.pessoaId) {
  //     this.pessoa = this.pessoaService.findById(this.pessoaId);
  //     JSON.stringify(this.pessoa);
  //   } else {
  //     this.pessoa = {
  //       nome: '',
  //       email: '',
  //       interesses: []
  //     }
  //   }
  //   this.dadosForm.get('nome')?.setValue(this.pessoa?.nome ?? '');
  //   this.dadosForm.get('email')?.setValue(this.pessoa?.email ?? '');
  //   this.dadosForm.get('dataNascimento')?.setValue(this.pessoa?.dataNascimento ?? '');
  // }

  // enviarDados() {
  //   const pessoa : Pessoa = {
  //     nome: this.dadosForm.value.nome ?? '',
  //     email: this.dadosForm.value.email ?? '',
  //     dataNascimento: this.dadosForm.value.dataNascimento ?? '',
  //     interessesIds: this.dadosForm.value.interesses ?? []
  //   }

  //   if (this.pessoaId) {
  //     this.pessoaService.update(this.pessoaId, pessoa)
  //   } else {
  //     this.pessoaService.addNew(pessoa);
  //   }
  // }

  pessoaId?: number;

  opcoesInteresses: (Interesse & {selecionado: boolean})[];

  dadosForm = new FormGroup({
    nome: new FormControl(''),
    email: new FormControl(''),
    dataNascimento: new FormControl('')
  });

  constructor(
      private pessoaService: PessoaRestService,
      interesseService: InteresseRestService,
      private route: ActivatedRoute,
      private router: Router) {
    this.pessoaId = Number(this.route.snapshot.params['id']);
    this.opcoesInteresses = [];
    interesseService.findAll().subscribe(interesses => {
      for (const opInteresse of interesses) {
        this.opcoesInteresses.push({
          id: opInteresse.id,
          nome: opInteresse.nome,
          selecionado: false
        });
      }
    })
  }

  ngOnInit(): void {
    if (this.pessoaId) {
       this.pessoaService.findById(this.pessoaId).subscribe(pessoa => {
        if (pessoa) {
          this.dadosForm.get('nome')?.setValue(pessoa.nome ?? '');
          this.dadosForm.get('email')?.setValue(pessoa.email ?? '');
          this.dadosForm.get('dataNascimento')?.setValue(pessoa.dataNascimento ?? '');
          const pessoaInteressesIds = pessoa.interesses?.map(interesse => interesse.id);
          for (const opInteresse of this.opcoesInteresses) {
            opInteresse.selecionado = pessoaInteressesIds?.includes(opInteresse.id) ?? false;
          }
        }
      });
    } else {
      this.dadosForm.get('nome')?.setValue('');
      this.dadosForm.get('email')?.setValue('');
      this.dadosForm.get('dataNascimento')?.setValue('');
    }
  }

  enviarDados() {
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
        this.router.navigate(['/pessoas'], { state: { mensagem: 'Pessoa alterada com sucesso', tipo: 'sucesso' }});
      });
    } else {
      this.pessoaService.addNew(pessoa).subscribe(() => {
        this.router.navigate(['/pessoas'], { state: { mensagem: 'Pessoa cadastrada com sucesso', tipo: 'sucesso' }});
      });
    }
  }

}
