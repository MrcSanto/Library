import AdressEntity from "../entities/adress-entity";

export type AdressListDto = {
    data : AdressEntity[];
    total : number;
}