import { SERVICOSHABITAT, ERROR_SERVICOSHABITAT } from "../types/ServicosHabitat";
import useValidator from "../hook/useValidator";

const NUMBER = '0123456789';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const SPECIALCHARACTER = "!'^%&#()=?@";

const ServicosHabitatValidationRules = {

    habitatId:(habitatId)=>{

        let mensagens = [];
        if(!habitatId || habitatId.trim().length === 0){ //o trim remove todos os espaços em branco e o lenght é o tamanho
            mensagens.push('Obrigatório informar o Id do habitat relacionado ao servico');
        }
        return mensagens;
    },

    servicosId:(servicosId)=>{

        let mensagens = [];
        if(!servicosId || servicosId.trim().length === 0){ //o trim remove todos os espaços em branco e o lenght é o tamanho
            mensagens.push('Obrigatório informar o Id do servico relacionado ao habitat');
        }
        return mensagens;
    },

}

export const useValidarDadosServicosHabitat = () => {
    return useValidator(SERVICOSHABITAT, ERROR_SERVICOSHABITAT, ServicosHabitatValidationRules);
}