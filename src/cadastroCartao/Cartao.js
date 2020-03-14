import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
export default class Cartao extends Component {

    constructor(props) {
        super(props);
        if (this.props.editar) {
            this.state = {
                id: this.props.editar.id,
                nome: this.props.editar.nome,
                limiteCartao: this.props.editar.limiteCartao,
                pessoaId: this.props.editar.pessoa ?
                    this.props.editar.pessoa.id : "",
                financeiraId: this.props.editar.financeira ?
                    this.props.editar.financeira.id : "",
                usuarioId: this.props.editar.usuario ?
                    this.props.editar.usuario.id : "",
            };
        }
        else {
            this.state = { nome: "", limiteCartao: "", pessoaId: "", financeiraId: "", usuarioId: "", };
        }
        this.state.pessoas = [];
        this.state.financeiras = [];
        this.state.usuarios = [];
        this.state.cartoes = [];

    }

    componentDidMount() {
        this.listaFinanceiras();
        this.listaPessoas();
        this.listaUsuarios();
        this.listaCartoes();
    }


    listaFinanceiras() {
        axios.get("/api/financeiras/").then(
            (resultado) => {
                this.setState({ financeiras: resultado.data });
            }
        );
    }


    listaPessoas() {
        axios.get("/api/pessoas/").then(
            (resultado) => {
                this.setState({ pessoas: resultado.data });
            }
        );
    }


    listaUsuarios() {
        axios.get("/api/usuarios/").then(
            (resultado) => {
                this.setState({ usuarios: resultado.data });
            }
        );
    }

     
    listaCartoes() {
        axios.get("/api/cartoes/").then(
            (resultado) => {
                this.setState({ cartoes: resultado.data });
            }
        );
    }


    setParam(param, valor) {
        this.setState({
            [param]: valor
        });
    }

    enviar() {
        let financeira = this.state.financeiras.find(
            (financeiraNoArray) => financeiraNoArray.id == this.state.financeiraId
        );
        let pessoa = this.state.pessoas.find(
            (pessoaNoArray) => pessoaNoArray.id == this.state.pessoaId
        );
        let usuario = this.state.usuarios.find(
            (usuarioNoArray) => usuarioNoArray.id == this.state.usuarioId
        );
        if (this.state.id) {
            this.props.onEditar({
                id: this.state.id,
                nome: this.state.nome,
                limiteCartao: this.state.limiteCartao,
                financeira: financeira,
                pessoa: pessoa,
                usuario: usuario,
            });
        } else {
            this.props.onAdicionar({
                nome: this.state.nome,
                limiteCartao: this.state.limiteCartao,
                financeira: financeira,
                pessoa: pessoa,
                usuario: usuario,
            });

        }
        this.setState({
            id: "",
            nome: "",
            limiteCartao: "",
            financeiraId: "",
            pessoaId: "",
            usuarioId: "",
        });
    }

    render() {

        return (
            <Dialog
                open={true}
            >
                <DialogTitle>{this.state.id ?
                    <h3> Editar Cartao {this.state.nome} de Id: {this.state.id} </h3> :
                    <h3>Cadastrar Cartao</h3>}</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nome"
                        fullWidth
                        value={this.state.nome}
                        onChange={(evento) => this.setParam('nome', evento.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Limite do Cartao"
                        fullWidth
                        type="number"
                        value={this.state.limiteCartao}
                        onChange={(evento) => this.setParam('limiteCartao', evento.target.value)}
                    />

                    <TextField
                        select
                        label="Financeira"
                        value={this.state.financeiraId}
                        onChange={(evento) => this.setParam("financeiraId", evento.target.value)}
                        helperText="Financeira"
                        margin="normal">

                        {this.state.financeiras.map(
                            (financeira) => <option value={financeira.id}>{financeira.nome}</option>)}
                    </TextField>

                    <TextField
                        select
                        label="Usuario"
                        value={this.state.usuarioId}
                        onChange={(evento) => this.setParam("usuarioId", evento.target.value)}
                        helperText="usuario"
                        margin="normal">

                        {this.state.usuarios.map(
                            (usuario) => <option value={usuario.id}>{usuario.nome}</option>)}
                    </TextField>

                    <TextField
                        select
                        label="Cliente"
                        value={this.state.pessoaId}
                        onChange={(evento) => this.setParam("pessoaId", evento.target.value)}
                        helperText="cliente"
                        margin="normal">

                        {this.state.pessoas.map(
                            (pessoa) => <option value={pessoa.id}>{pessoa.nome}</option>)}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.enviar()} color="primary">
                        {this.state.id ? "Confirmar" : "Adicionar"}
                    </Button>
                    <Button onClick={() => { this.props.onCancelar() }} color="secondary">
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog >
        );
    }
}
