import React, { Component } from 'react';
import axios from 'axios';
import Cartao from './Cartao';
import ListarCartao from './ListarCartao';
import Button from '@material-ui/core/Button';

export default class Produtos extends Component {

    constructor() {
        super();
        this.state = {
            cartoes: [],
            editarCartao: null
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
        this.ListarCartao();
    }
    ListarCartao() {
        this.setState({
            cartoes: []
        });
        axios.get("/api/cartoes/").then(
            (retorno) => this.setState({
                cartoes: retorno.data
            })
        ).catch((erro) => this.tratarErro(erro));
    }

    confirmarEdicao(cartao) {
        axios.put("/api/cartoes/" + cartao.id, cartao).then(
            () => {
                this.ListarCartao();
                this.limpar();
            }
        ).catch((erro) => this.tratarErro(erro));
    }


    adicionarCartao(cartao) {
        axios.post("/api/cartoes/", cartao).then(
            (retorno) => {
                this.setState({
                    cartoes: [...this.state.cartoes, retorno.data]});
                this.limpar();
            }
        ).catch((erro) => this.tratarErro(erro));

    }
    excluir(cartao) {
        axios.delete("/api/cartoes/" + cartao.id).then(
            () => this.ListarCartao()
        ).catch((erro) => this.tratarErro(erro));
    }

    editar(cartao) {
        this.setState({
            editarCartao: cartao,
            exibirFormulario: true
        });
    }


    limpar() {
        this.setState({
            editarCartao: null,
            exibirFormulario: false,
        });
    }
    novo() {
        this.setState({
            editarCartao: null,
            exibirFormulario: true,
        });
    }
    render() {
        return (
            <div><h3>LISTA DE CARTÕES</h3>
                <ListarCartao
                    listarCartao={this.state.cartoes}
                    onExcluir={(cartao) => this.excluir(cartao)}
                    onEditar={(cartao) => this.editar(cartao)} />
                <br></br>
                {this.state.exibirFormulario ? <Cartao
                    key={this.state.editarCartao ?
                        this.state.editarCartao.id : "novo"}
                    editar={this.state.editarCartao}
                    onCancelar={() =>this.limpar()}
                    onEditar={(cartao) => this.confirmarEdicao(cartao)}
                    onAdicionar={(cartao) => this.adicionarCartao(cartao)} /> :
                    <Button onClick={() => this.novo()}color="primary">
                    NOVO CARTÃO
                    </Button>}

            </div>
        );
    }
}
