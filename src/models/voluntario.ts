export interface listDataVoluntarioInfo {
    name: string;
    email: string;
    password?: string;
    registration?: string;
    cpf: string;
    phone: string;
    funcao: string;
    cep: string;
    rua: string;
    bairro: string;
    numero: string;
    cidade: string;
    
}


export class Volutario {
    name: string;
    email: string;
    password?: string;
    registration?: string;
    cpf: string;
    phone: string;
    funcao: string;
    cep: string;
    rua: string;
    bairro: string;
    numero: string;
    cidade: string;

    constructor(email: string, password: string,name:string, cpf: string,phone: string, funcao: string, cep: string, rua: string, bairro: string, numero: string, cidade: string) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.cpf = cpf;
        this.phone = phone;
        this.funcao = funcao;
        this.cep = cep;
        this.rua = rua;
        this.bairro = bairro;
        this.numero = numero;
        this.cidade = cidade;
        this.registration = '';
    }
}
