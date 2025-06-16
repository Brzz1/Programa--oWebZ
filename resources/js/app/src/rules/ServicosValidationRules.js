import useValidator from "../hook/useValidator";
import { SERVICOS, ERROR_SERVICOS } from "../types/Servicos";

const ServicosValidationRules = {

  tipo:(tipo)=>{
        let mensagens = [];
        if (!tipo || tipo.trim().length === 0){
            mensagens.push('Obrigatório informar o tipo dos servicos');
        }
        return mensagens;
    },

  horarioInicio:(horarioInicio)=>{
      let mensagens = [];
      if (!horarioInicio || horarioInicio.trim().length === 0){
          mensagens.push('Obrigatório informar o horario de inicio dos servicos');
      }
      return mensagens;
  },

  horarioEstimado:(horarioEstimado)=>{
    let mensagens = [];
    if (!horarioEstimado || horarioEstimado.trim().length === 0){
        mensagens.push('Obrigatório informar o horario estimado dos servicos');
    }
    return mensagens;
  },

  qtdPessoas:(qtdPessoas)=>{
      let mensagens = [];
      if (!qtdPessoas || qtdPessoas.trim().length === 0){
          mensagens.push('Obrigatório informar a quantidade de pessoas dos servicos');
      }
      return mensagens;
  },

}

export const useValidarDadosServicos = (initialModel, errorModel, validationRules) => {
  return useValidator(SERVICOS, ERROR_SERVICOS, ServicosValidationRules);
}