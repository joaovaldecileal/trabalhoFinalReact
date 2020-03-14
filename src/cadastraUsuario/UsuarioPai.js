import React, { Component } from 'react';
import Usuario from './Usuario';
import axios from 'axios';
import ListarUsuario from './ListarUsuario';
import Button from '@material-ui/core/Button';

export default class UsuarioPai extends Component {
    constructor() {
        super();
        this.state = {
            usuarios: [],
            editarUsuario: null,
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
        this.listarUsuario();
    }
    listarUsuario() {
        axios.get("/api/usuarios/").then(
            (retorno) => this.setState({
                usuarios: retorno.data
            })
        ).catch((erro)=>this.tratarErro(erro));
    }
    adicionarUsuario(usuario) {
        axios.post("/api/usuarios/", usuario).then(
            (insere) => {
                this.setState({
                    usuarios: [...this.state.usuarios, insere.data]});
                    this.limpar();
                }
        ).catch((erro)=>this.tratarErro(erro));
    }
    confirmarEdicao(usuario) {
        axios.put("/api/usuarios/" + usuario.id, usuario).then(
            () => {
                this.listarUsuario();
                this.limpar();
            }
        ).catch((erro)=>this.tratarErro(erro));
    }
    excluirUsuario(usuario) {
        axios.delete("/api/usuarios/" + usuario.id).then(
            () => this.listarUsuario()
        ).catch((erro)=>this.tratarErro(erro));
    }
    editar(usuario) {
        this.setState({
            exibirFormulario: true,
            editarUsuario: usuario,
        });
    }
    limpar() {
        this.setState({
            editarUsuario: null,
            exibirFormulario: false,
        });
    }
    novo() {
        this.setState({
            editarUsuario: null,
            exibirFormulario: true,
        });
    }
    render() {
        return (
            <div><h3>lista de usuarios</h3>
                <ListarUsuario
                    listaUsuario={this.state.usuarios}
                    onEditar={(usuario) => this.editar(usuario)}
                    onExcluirUsuario={(usuario) => this.excluirUsuario(usuario)} />
                <br /><br />
                {this.state.exibirFormulario?<Usuario key={this.state.editarUsuario ?
                    this.state.editarUsuario.id : "novo"}
                    editar={this.state.editarUsuario}
                    onCancelar={() =>this.limpar()}
                    onEditar={(usuario) => this.confirmarEdicao(usuario)}
                    onAdicionar={(usuario) => this.adicionarUsuario(usuario)} />:
                    <Button onClick={() => this.novo()} color="primary">
                    NOVO USUARIO
                    </Button>}
                
            </div>
        );
    }
}