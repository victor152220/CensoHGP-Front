import { Component, OnInit } from '@angular/core';
import { Departamento } from './../model/departamento';
import { DepartamentoService } from './../service'
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CadastroDepartamentoComponent } from '../cadastro-departamento/cadastro-departamento.component';
import { DescricaoDepartamentoComponent } from '../descricao-departamento/descricao-departamento.component';

@Component({
  selector: 'app-lista-departamentos',
  templateUrl: './lista-departamentos.component.html',
  styleUrls: ['./lista-departamentos.component.scss']
})
export class ListaDepartamentosComponent implements OnInit {
  lista: Departamento[] = [];
  paginaAtual: number = 1;
  contador: number = 10;
  ativo: string = '';
  searchText: string;
  statusSpinner: boolean = false;
  tipoDepartamento: string = '';
  departamentoAux: Departamento;
  varConfirm: string;
  listaAtivo: any[];
  listaTipoDepartamento: any[];
  mensagem: string;
  MODALOPTIONS: NgbModalOptions = { keyboard: true, size: 'lg', backdrop: 'static' };
  constructor(private departamentosService: DepartamentoService,
    public modalService: NgbModal) { }
  ngOnInit(): void {
    this.loadListaDepartamentos();
    this.listaAtivo = this.departamentosService.getStatusDepartamentos();
    this.listaTipoDepartamento = this.departamentosService.getTipoDepartamentos();
    CadastroDepartamentoComponent.atualizando.subscribe(
      () => {
        this.loadListaDepartamentos();
      });
  }
  limpar() {
    this.searchText = '';
  }
  verifica() {
    this.paginaAtual = 1;
  }
  cadastrar() {
    const modalRef = this.modalService.open(CadastroDepartamentoComponent, this.MODALOPTIONS);
    modalRef.componentInstance.tituloModal = 'Cadastrar departamento';
  }
  editar(departamento: Departamento) {
    const modalRef = this.modalService.open(CadastroDepartamentoComponent, this.MODALOPTIONS);
    modalRef.componentInstance.tituloModal = 'Editar departamento';
    modalRef.componentInstance.departamento = departamento;
  }
  descricao(departamento: Departamento) {
    const modalRef = this.modalService.open(DescricaoDepartamentoComponent, this.MODALOPTIONS);
    modalRef.componentInstance.tituloModal = 'Descrição do departamento';
    modalRef.componentInstance.departamento = departamento;
  }
  filtroStatus(value: any) {
    this.ativo = value;
    this.loadListaDepartamentos();
  }
  filtroTipoDepartamento(value: any) {
    this.tipoDepartamento = value;
    this.loadListaDepartamentos();
  }
  loadListaDepartamentos() {
    this.statusSpinner = true;
    this.lista = [];
    this.paginaAtual = 1;
    if (this.tipoDepartamento != '' || this.ativo != '') {
      setTimeout(() => {
        this.departamentosService.getPorFiltros(this.tipoDepartamento, this.ativo)
          .subscribe(
            data => {
              this.lista = data;
              this.statusSpinner = false;
            });
      }, 400);
    }
    else {
      setTimeout(() => {
        this.departamentosService.getAll()
          .subscribe(
            data => {
              this.lista = data;
              this.statusSpinner = false;
            }
          );
      }, 400);
    }
  }
  pegaId(departamento: Departamento) {
      if (departamento.ativo === true) {
        this.varConfirm = 'desativar';
      } else {
        this.varConfirm = 'ativar';
      }
      this.departamentoAux = departamento;

  }
  mudarStatus() {
    if (this.departamentoAux.ativo === true) {
      this.departamentoAux.ativo = false;
      this.departamentosService.disable(this.departamentoAux).subscribe(
        () => this.loadListaDepartamentos()
      );
    } else {
      this.departamentoAux.ativo = true;
      this.departamentosService.disable(this.departamentoAux).subscribe(
        () => this.loadListaDepartamentos()
      );
    }
  }
}
