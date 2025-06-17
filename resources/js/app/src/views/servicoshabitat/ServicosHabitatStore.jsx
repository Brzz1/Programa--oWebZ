import React, { Fragment} from 'react'
import axiosClient from '../../axiosClient';
import { Link, useNavigate} from 'react-router-dom';
import Input from '../../components/input/Input';
import { useValidarDadosservicoshabitat} from '../../rules/servicoshabitatValidationRules';

function servicoshabitatFormStore()
{
    const navigate = useNavigate();

    const {
        model,
        error,
        setModel,
        formValid,
        handleChangeField,
        handleBlurField
    } = useValidarDadosservicoshabitat("create");

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        if (formValid()) {
            console.log("Formulário válido");
            axiosClient.post(`/servicoshabitat/store`, model)
            .then(() =>{
                setModel({});
                console.log('servicoshabitat incluído com sucesso');
                navigate('/servicoshabitat/index')
            }).catch((error)=>{
                console.log(error);
            })
        }
    }

    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    <h1>Inclusão de servicoshabitat</h1>

                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className ="p-20"> 
                            <Input 
                                id="habitatId"
                                type="text"
                                value={model.habitatId}
                                placeholder="Tipo do habitat"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.tipo}
                                mensagem={error.tipoMensagem}
                            />
                        </div>
                        <div className ="p-20">
                            <Input 
                                id="tamanho"
                                type="text"
                                value={model.servicosId}
                                placeholder="Id do servico"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.tamanho}
                                mensagem={error.tamanhoMensagem}
                            />
                        </div>
                        <button className="btn btn-add" to="/servicoshabitat/index">Salvar</button>
                        <Link
                            type='button' 
                            className='btn btn-cancel'
                            to='/servicoshabitat/index'>
                                Cancelar
                        </Link>
                    </form>
                </div> 
            </div>
        </Fragment>
    )
}

export default servicoshabitatFormStore