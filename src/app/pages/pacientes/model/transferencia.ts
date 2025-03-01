import { Departamento } from 'src/app/pages/departamentos/model/departamento';

export interface Transferencia {
    matricula: string;
    idPaciente: number;
    departamentoOrigem: Departamento;
    departamentoDestino: Departamento;
    observacao: string;
    dataTransferencia: Date;
}