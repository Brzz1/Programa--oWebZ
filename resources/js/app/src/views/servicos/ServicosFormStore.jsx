import React, { Fragment} from 'react'
import axiosClient from '../../axiosClient';
import { Link, useNavigate} from 'react-router-dom';
import Input from '../../components/input/Input';
import { useValidarDadosServicos} from '../../rules/ServicosValidationRules';

function ServicosFormStore()
{
    const navigate = useNavigate();

    const {
        model,
        error,
        setModel,
        formValid,
        handleChangeField,
        handleBlurField
    } = useValidarDadosServicos("create");

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        if (formValid()) {
            console.log("Formulário válido");
            axiosClient.post(`/servicos/store`, model)
            .then(() =>{
                setModel({});
                console.log('servico incluído com sucesso');
                navigate('/servicos/index')
            }).catch((error)=>{
                console.log(error);
            })
        }
    }

    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    <h1>Inclusão de servicos</h1>

                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className ="p-20"> 
                            <Input 
                                id="tipo"
                                type="text"
                                value={model.tipo}
                                placeholder="tipo de servico"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.tipo}
                                mensagem={error.tipoMensagem}
                            />
                        </div>
                        <div className ="p-20">
                            <Input 
                                id="horarioInicio"
                                type="text"
                                value={model.horarioInicio}
                                placeholder="horario de inicio do servico"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.horarioInicio}
                                mensagem={error.horarioInicioMensagem}
                            />
                        </div>
                        <div className ="p-20">
                            <Input 
                                id="horarioEstimado"
                                type="text"
                                value={model.horarioEstimado}
                                placeholder="horario estimado do servico"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.horarioEstimado}
                                mensagem={error.horarioEstimadoMensagem}
                            />
                        </div>
                        <div className ="p-20">
                            <Input 
                                id="qtdPessoas"
                                type="text"
                                value={model.qtdPessoas}
                                placeholder="quantidade de pessoas do servico"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.qtdPessoas}
                                mensagem={error.qtdPessoasMensagem}
                            />
                        </div>
                        <button className="btn btn-add" to="/servicos/index">Salvar</button>
                        <Link
                            type='button' 
                            className='btn btn-cancel'
                            to='/servicos/index'>
                                Cancelar
                        </Link>
                    </form>
                </div> 
            </div>
        </Fragment>
    )
}

export default ServicosFormStore