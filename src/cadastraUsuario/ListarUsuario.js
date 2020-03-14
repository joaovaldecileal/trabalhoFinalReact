import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';


export default class ListarUsuario extends Component {

    render() {

        return <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>Login</TableCell>
                    
                </TableRow>
            </TableHead>
            <TableBody>
                {this.props.listaUsuario.map(
                    (usuario) => <TableRow key={usuario.id}>
                        <TableCell>{usuario.id}</TableCell>
                        <TableCell>{usuario.nome}</TableCell>
                        <TableCell>{usuario.login}</TableCell>
                        <TableCell style={{ border: "none" }}>
                            <Button onClick={() => this.props.onExcluirUsuario(usuario)} color="primary">
                                excluir
                            </Button>
                            <Button onClick={() => this.props.onEditar(usuario)} color="secondary">
                                editar
                            </Button>
                            </TableCell>
                    </TableRow>
                )}


            </TableBody>
        </Table>;
    }
}