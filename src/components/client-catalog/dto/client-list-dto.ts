import ClienteEntity from "../entities/cliente-entity";

export type ClientListDto = {
    data : ClienteEntity[];
    total : number;
}