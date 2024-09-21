import EmprestimoEntity from "../entities/emprestimo-entity";

export type EmprestimoListDto = {
    data : EmprestimoEntity[];
    total : number;
}