import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default class CadastraUsuario extends Component {
    constructor(props) {
        super(props);
        if (this.props.editar) {
            this.state = {
                id: this.props.editar.id,
                nome: this.props.editar.nome,
                login:this.props.editar.login,
            }
        } else {
            this.state = {
                nome: "",
                login: "",
                senha: "",
            }
        }

    }
    setParam(param, valor) {
        this.setState({
            [param]: valor
        });
    }
    enviar() {
        if (this.state.id) {
            this.props.onEditar({
                id: this.state.id,
                nome: this.state.nome,
                login: this.state.login,
            })

        }else{
            this.props.onAdicionar({
                nome: this.state.nome,
                login: this.state.login,
                senha: this.state.senha
            });
        }
        this.setState({
            id: "",
            nome: "",
            login: "",
            senha: ""
        });
    }
    render() {
        return <Dialog
        open={true}
    >
             <DialogTitle>{this.state.id?
            <h3> Editar Usuario {this.state.nome} de Id: {this.state.id} </h3>:
                <h3>Cadastrar Usuario</h3> }</DialogTitle>
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
                    label="Login"
                    fullWidth
                    value={this.state.login}
                    onChange={(evento) => this.setParam('login', evento.target.value)}
                />
                {this.state.id? "":<TextField
                    autoFocus
                    margin="dense"
                    label="Senha"
                    fullWidth
                    type="password"
                    value={this.state.senha}
                    onChange={(evento) => this.setParam('senha', evento.target.value)}
                />}
                 
            </DialogContent>
            <DialogActions>
                <Button onClick={() => this.enviar()} color="primary">
                {this.state.id ? "Confirmar" : "Adicionar"}
              </Button>
                <Button onClick={() => { this.props.onCancelar() }} color="secondary">
                Cancelar
              </Button>
            </DialogActions>
            </Dialog>

    }
}