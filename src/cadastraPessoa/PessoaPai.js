import React, { Component } from 'react';
import axios from 'axios';
import Pessoa from './Pessoa';
import ListarPessoa from './ListarPessoa';
import Button from '@material-ui/core/Button';


export default class PessoaPai extends Component {
    constructor() {
        super();
        this.state = {
            pessoas: [],
            editarPessoas: null,
        };
    }

    tratarErro(erro) {
        console.log(erro.response);
        if (erro.response.data.message)
            alert(erro.response.data.message);
        else
            alert(erro.response.data);
    }

    componentDidMount() {
        this.ListarPessoa();
    }
    ListarPessoa() {
        axios.get("/api/pessoas/").then(
            (retorno) => this.setState({
                pessoas: retorno.data
            })
        ).catch((erro) => this.tratarErro(erro));
    }
    adicionarPessoa(pessoa) {
        axios.post("/api/pessoas/", pessoa).then(
            (insere) => {
                this.setState({
                    pessoas: [...this.state.pessoas, insere.data]
                });
                this.limpar();
            }
        ).catch((erro)=>this.tratarErro(erro));
    }
    confirmarEdicao(pessoa) {
        axios.put("/api/pessoas/" + pessoa.id, pessoa).then(
            () => {
                this.ListarPessoa();
                this.limpar();
            }
        ).catch((erro)=>this.tratarErro(erro));
    }
    excluirPessoa(pessoa) {
        axios.delete("/api/pessoas/" + pessoa.id).then(
            () => this.ListarPessoa()
        ).catch((erro)=>this.tratarErro(erro));
    }
    editar(pessoa) {
        this.setState({
            editarPessoas: pessoa,
            exibirFormulario: true,
        });
    }
    limpar() {
        this.setState({
            editarPessoas: null,
            exibirFormulario: false,
        });
    }
    novo() {
        this.setState({
            editarPessoas: null,
            exibirFormulario: true,
        });
    }
    render() {
        return (
            <div><h3>lista de clientes</h3>
                <ListarPessoa
                    listaPessoa={this.state.pessoas}
                    onEditar={(pessoa) => this.editar(pessoa)}
                    onExcluirPessoa={(pessoa) => this.excluirPessoa(pessoa)} />
                <br /><br />
                {this.state.exibirFormulario ? <Pessoa key={this.state.editarPessoas ?
                    this.state.editarPessoas.id : "novo"}
                    editar={this.state.editarPessoas}
                    onCancelar={() =>this.limpar()}
                    onEditar={(pessoa) => this.confirmarEdicao(pessoa)}
                    onAdicionarPessoa={(pessoa) => this.adicionarPessoa(pessoa)} /> :
                    <Button onClick={() => this.novo()} color = "primary">
                    NOVO CLIENTE
                    </Button>}

            </div>
        );
    }
}