export interface listDataInstitutionInfo {
    name: string;
    email: string;
    password?: string;
    cnpj: string;
    phone: string;
    tipo: string;
    info: string;
    hours: string;
    voluntarioStatus: string;
    doacoeStatus: string;
    itensNecessarios: string;
    servicosNecessarios: string;
    cep: string;
    rua: string;
    bairro: string;
    numero: string;
    cidade: string;
    
}
export class Institution {
    name: string;
    email: string;
    password?: string;
    cnpj: string;
    phone: string;
    tipo: string;
    info: string;
    hours: string;
    voluntarioStatus: string;
    doacoeStatus: string;
    itensNecessarios: string;
    servicosNecessarios: string;
    cep: string;
    rua: string;
    bairro: string;
    numero: string;
    cidade: string;

    constructor(email: string, password: string, name: string, cnpj: string, phone: string, tipo: string,
        info: string,hours: string, voluntarioStatus: string, doacoeStatus: string, itensNecessarios: string, servicosNecessarios: string, 
        cep: string, rua: string, bairro: string, numero: string, cidade: string) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.cnpj = cnpj;
        this.phone = phone;
        this.tipo = tipo;
        this.info = info;
        this.hours = hours;
        this.voluntarioStatus = voluntarioStatus;
        this.doacoeStatus = doacoeStatus;
        this.itensNecessarios = itensNecessarios;
        this.servicosNecessarios = servicosNecessarios;
        this.cep = cep;
        this.rua = rua;
        this.bairro = bairro;
        this.numero = numero;
        this.cidade = cidade;
    }
}