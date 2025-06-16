import useValidator from "../hook/useValidator";
import { HABITAT, ERROR_HABITAT } from "../types/Habitat";

const HabitatValidationRules = {

  tipo:(tipo)=>{
        let mensagens = [];
        if (!tipo || tipo.trim().length === 0){
            mensagens.push('Obrigatório informar o tipo do habitat');
        }
        return mensagens;
    },

  tamanho:(tamanho)=>{
      let mensagens = [];
      if (!tamanho || tamanho.trim().length === 0){
          mensagens.push('Obrigatório informar a tamanho do habitat');
      }
      return mensagens;
  },


}

export const useValidarDadosHabitat = (initialModel, errorModel, validationRules) => {
  return useValidator(HABITAT, ERROR_HABITAT, HabitatValidationRules);
}