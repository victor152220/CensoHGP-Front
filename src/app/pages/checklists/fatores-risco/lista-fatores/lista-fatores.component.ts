import { Component, OnInit } from '@angular/core';
import { FatorRiscoService } from '../service/fator-risco.service';
import { Fatores } from '../model/fatores';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CadastroFatoresComponent } from '../cadastro-fatores/cadastro-fatores.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-lista-fatores',
  templateUrl: './lista-fatores.component.html',
  styleUrls: ['./lista-fatores.component.scss']
})
export class ListaFatoresComponent implements OnInit {
  formularioCadastro:FormGroup =null;
  formularioAtualizar:FormGroup =null;
  idFator:number = 0;
  status: boolean;
  lista: Fatores[];
  msgError: string;
  sucesso: boolean = false;
  searchText: string;
  pageSize = 10;
  page = 1;
  constructor(private fatoresService: FatorRiscoService,  public modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.msgError= null;
    this.loadListaFatores();
    this.formularioCadastro = this.formBuilder.group({
      idFatorRisco: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      descricao: [null]
    })
    this.formularioAtualizar = this.formBuilder.group({
      idFatorRisco: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      descricao: [null]
    })
  }
  limpar(){
    this.searchText = '';
    return this.searchText;
  }
  cadastrar(){
    let ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : true,
      size : 'lg'
    };
    const modalRef = this.modalService.open(CadastroFatoresComponent, ngbModalOptions)
    modalRef.componentInstance.formulario = this.formularioCadastro;

  }

  atualizar() {
    let ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : true,
      size : 'lg'
    };
    const modalRef = this.modalService.open(CadastroFatoresComponent, ngbModalOptions);
    if(this.formularioAtualizar != null){
      modalRef.componentInstance.formulario = this.formularioAtualizar;
    }

  }
  editar(id:number){
    this.fatoresService.getById(id).subscribe((fatores) => {
      console.log(fatores);
      this.updateForm(fatores);
      console.log(this.formularioAtualizar)
      if(this.formularioAtualizar != null){
        this.atualizar();
      }
    })
  }
  updateForm(fatores: Fatores){
    this.formularioAtualizar.patchValue({
      idFatorRisco: fatores.idFatorRisco,
      nome:fatores.nome,
      descricao: fatores.descricao
    })
  }
  loadListaFatores() {
    this.fatoresService.getAll()
    .subscribe(
      data => {
        this.lista = data;
        console.log(data);
      },
      error => {
        console.log('Erro serviço ' + error)
      })
    }
  }