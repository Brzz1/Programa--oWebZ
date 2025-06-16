import React, { Fragment} from 'react'
import axiosClient from '../../axiosClient';
import { Link, useNavigate} from 'react-router-dom';
import Input from '../../components/input/Input';
import { useValidarDadoscuidador} from '../../rules/CuidadorValidationRules';

function CuidadorFormStore()
{
    const navigate = useNavigate();

    const {
        model,
        error,
        setModel,
        formValid,
        handleChangeField,
        handleBlurField
    } = useValidarDadosCuidador("create");

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        if (formValid()) {
            console.log("Formulário válido");
            axiosClient.post(`/cuidador/store`, model)
            .then(() =>{
                setModel({});
                console.log('Cuidador incluído com sucesso');
                navigate('/cuidador/index')
            }).catch((error)=>{
                console.log(error);
            })
        }
    }

    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    <h1>Inclusão de Cuidador</h1>

                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className ="p-20"> 
                            <Input 
                                id="nome"
                                type="text"
                                value={model.nome}
                                placeholder="Nome do Cuidador"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.nome}
                                mensagem={error.nomeMensagem}
                            />
                        </div>
                        <div className ="p-20">
                            <Input 
                                id="dataNascimento"
                                type="text"
                                value={model.dataNascimento}
                                placeholder="Data de nascimento do Cuidador"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.dataNascimento}
                                mensagem={error.dataNascimentoMensagem}
                            />
                        </div>
                        <div className ="p-20">
                            <Input 
                                id="CPF"
                                type="text"
                                value={model.CPF}
                                placeholder="CPF do Cuidador"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.CPF}
                                mensagem={error.CPFMensagem}
                            />
                        </div>
                        <div className ="p-20">
                            <Input 
                                id="contato"
                                type="text"
                                value={model.contato}
                                placeholder="Contato do Cuidador"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.contato}
                                mensagem={error.contatoMensagem}
                            />
                        </div>
                        <div className ="p-20">
                            <Input 
                                id="endereco"
                                type="text"
                                value={model.endereco}
                                placeholder="Endereco do Cuidador"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.endereco}
                                mensagem={error.enderecoMensagem}
                            />
                        </div>
                        <button className="btn btn-add" to="/cuidador/index">Salvar</button>
                        <Link
                            type='button' 
                            className='btn btn-cancel'
                            to='/cuidador/index'>
                                Cancelar
                        </Link>
                    </form>
                </div> 
            </div>
        </Fragment>
    )
}

export default CuidadorFormStore