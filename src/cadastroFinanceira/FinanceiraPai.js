import React, { Component } from 'react';
import axios from 'axios';
import Financeira from './Financeira'
import ListarFinanceira from './ListarFinanceira';
import Button from '@material-ui/core/Button';


export default class FinanceiraPai extends Component {
    constructor() {
        super();
        this.state = {
            financeiras: [],
            editarFinanceira: null,
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
        this.ListarFinanceira();
    }
    ListarFinanceira() {
        axios.get("/api/financeiras/").then(
            (retorno) => this.setState({
                financeiras: retorno.data
            })
        ).catch((erro)=>this.tratarErro(erro));
    }
   

    adicionarFinanceira(financeira) {
        axios.post("/api/financeiras/", financeira).then(
            (insere) => {
                this.setState({
                    financeiras: [...this.state.financeiras, insere.data]
                });this.limpar();
            }
        ).catch((erro)=> this.tratarErro(erro));
    }

    excluirFinanceira(financeira) {
        axios.delete("/api/financeiras/" + financeira.id).then(
            () => this.ListarFinanceira()
        ).catch((erro)=> this.tratarErro(erro));
    }
    confirmarEdicao(financeira) {
        axios.put("/api/financeiras/" + financeira.id, financeira).then(
            () => {
                this.ListarFinanceira();
                this.limpar();
            }
        ).catch((erro)=>this.tratarErro(erro));

    }
    editar(financeira) {
        this.setState({
            editarFinanceira: financeira,
            cadastroFinanceira:true,
        });

    }
  
    limpar() {
        this.setState({
            editarFinanceira:null,
            cadastroFinanceira:false,
        });
    }
    novo() {
        this.setState({
            editarFinanceira:null,
            cadastroFinanceira:true,
        });
    }
    render() {
        return (
            <div><h3>Listar Financeira</h3>
                <ListarFinanceira
                    listaFinanceira={this.state.financeiras}
                    onEditar={(financeira) => this.editar(financeira)}
                    onExcluirFinanceira={(financeira) => this.excluirFinanceira(financeira)} />
                <br /><br />
                {this.state.cadastroFinanceira? <Financeira key={this.state.editarFinanceira ?
                    this.state.editarFinanceira.id : "novo"}
                    onCancelar={() =>this.limpar()}
                    editar={this.state.editarFinanceira}
                    onEditar={(financeira) => this.confirmarEdicao(financeira)}
                    onAdicionarFinanceira={(financeira) => this.adicionarFinanceira(financeira)} />:
                    <Button onClick={()=>this.novo()} color="primary">
                    NOVO CARTÃO
                    </Button>}
                
                    

            </div>
        );
    }
}