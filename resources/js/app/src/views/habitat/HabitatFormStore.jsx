import React, { Fragment} from 'react'
import axiosClient from '../../axiosClient';
import { Link, useNavigate} from 'react-router-dom';
import Input from '../../components/input/Input';
import { useValidarDadosHabitat} from '../../rules/HabitatValidationRules';

function HabitatFormStore()
{
    const navigate = useNavigate();

    const {
        model,
        error,
        setModel,
        formValid,
        handleChangeField,
        handleBlurField
    } = useValidarDadosHabitat("create");

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        if (formValid()) {
            console.log("Formulário válido");
            axiosClient.post(`/habitat/store`, model)
            .then(() =>{
                setModel({});
                console.log('habitat incluído com sucesso');
                navigate('/habitat/index')
            }).catch((error)=>{
                console.log(error);
            })
        }
    }

    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    <h1>Inclusão de Habitat</h1>

                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className ="p-20"> 
                            <Input 
                                id="tipo"
                                type="text"
                                value={model.tipo}
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
                                value={model.tamanho}
                                placeholder="Tamanho do habitat"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.tamanho}
                                mensagem={error.tamanhoMensagem}
                            />
                        </div>
                        <button className="btn btn-add" to="/habitat/index">Salvar</button>
                        <Link
                            type='button' 
                            className='btn btn-cancel'
                            to='/habitat/index'>
                                Cancelar
                        </Link>
                    </form>
                </div> 
            </div>
        </Fragment>
    )
}

export default HabitatFormStore