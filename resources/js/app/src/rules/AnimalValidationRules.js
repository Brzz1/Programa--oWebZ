import useValidator from "../hook/useValidator";
import { ANIMAL, ERROR_ANIMAL } from "../types/Animal";

const AnimalValidationRules = {

  nome:(nome)=>{
        let mensagens = [];
        if (!nome || nome.trim().length === 0){
            mensagens.push('Obrigatório informar o nome do animal');
        }
        return mensagens;
    },

  dataCadastro:(dataCadastro)=>{
      let mensagens = [];
      if (!dataCadastro || dataCadastro.trim().length === 0){
          mensagens.push('Obrigatório informar a data de cadastro do animal');
      }
      return mensagens;
  },

  especie:(especie)=>{
    let mensagens = [];
    if (!especie || especie.trim().length === 0){
        mensagens.push('Obrigatório informar o endereço do animal');
    }
    return mensagens;
  },

  alimentacao:(alimentacao)=>{
      let mensagens = [];
      if (!alimentacao || alimentacao.trim().length === 0){
          mensagens.push('Obrigatório informar a alimentacao do animal');
      }
      return mensagens;
  },

  sexo:(sexo)=>{
    let mensagens = [];
    if (!sexo || sexo.trim().length === 0){
        mensagens.push('Obrigatório informar o sexo do animal');
    }
    return mensagens;
  },

  idade:(idade)=>{
    let mensagens = [];
    if (!idade || idade.trim().length === 0){
        mensagens.push('Obrigatório informar a idade do animal');
    }
    return mensagens;
  }, 

}

export const useValidarDadosanimal = (initialModel, errorModel, validationRules) => {
  return useValidator(ANIMAL, ERROR_ANIMAL, AnimalValidationRules);
}