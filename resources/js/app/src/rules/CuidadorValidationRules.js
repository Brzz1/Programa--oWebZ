import useValidator from "../hook/useValidator";
import { CUIDADOR, ERROR_CUIDADOR } from "../types/Cuidador";

const CuidadorValidationRules = {

  nome:(nome)=>{
        let mensagens = [];
        if (!nome || nome.trim().length === 0){
            mensagens.push('Obrigatório informar o nome do cuidador');
        }
        return mensagens;
    },

  endereco:(endereco)=>{
      let mensagens = [];
      if (!endereco || endereco.trim().length === 0){
          mensagens.push('Obrigatório informar o endereco do cuidador');
      }
      return mensagens;
  },

  CPF:(CPF)=>{
    let mensagens = [];
    if (!CPF || CPF.trim().length === 0){
        mensagens.push('Obrigatório informar o CPF do cuidador');
    }
    return mensagens;
  },

  contato:(contato)=>{
      let mensagens = [];
      if (!contato || contato.trim().length === 0){
          mensagens.push('Obrigatório informar o contato do cuidador');
      }
      return mensagens;
  },

  email:(email)=>{
    let mensagens = [];
    if (!email || email.trim().length === 0){
        mensagens.push('Obrigatório informar o email do cuidador');
    }
    return mensagens;
  },

}

export const useValidarDadosCuidador = (initialModel, errorModel, validationRules) => {
  return useValidator(CUIDADOR, ERROR_CUIDADOR, CuidadorValidationRules);
}