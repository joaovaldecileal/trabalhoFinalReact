import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

export default class ListarPessoa extends Component {

    render() {

        return <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>ENDEREÇO</TableCell>
                    <TableCell>CPF</TableCell>
                    <TableCell>TELEFONE</TableCell>
                    <TableCell>AÇÃO</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {this.props.listaPessoa.map(
                    (pessoa) => <TableRow key={pessoa.id}> 
                         <TableCell>{pessoa.id}</TableCell>
                        <TableCell>{pessoa.nome}</TableCell>
                        <TableCell>{pessoa.endereco}</TableCell>
                        <TableCell>{pessoa.cpf}</TableCell>
                        <TableCell>{pessoa.telefone}</TableCell>
                        <TableCell>

                            <Button onClick={() => this.props.onExcluirPessoa(pessoa)} color="primary">
                                Excluir
                            </Button>
                            <Button onClick={() => this.props.onEditar(pessoa)} color="secondary">
                                Editar
                           </Button>
                        </TableCell>
                    </TableRow>
                )}


            </TableBody>
        </Table>;
    }
}