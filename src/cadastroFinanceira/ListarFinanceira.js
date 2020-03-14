import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

export default class ListarFinanceira extends Component {

    render() {

        return <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>Validade</TableCell>
                    <TableCell>Limite do Cartão</TableCell>
                    <TableCell>Financeira</TableCell>
                    <TableCell>Cliente</TableCell>

                </TableRow>
            </TableHead>
            <TableBody>
                {this.props.listaFinanceira.map(
                    (financeira) => <TableRow key={financeira.id}>
                        <TableCell>{financeira.id}</TableCell>
                        <TableCell>{financeira.nome}</TableCell>
                        <TableCell>{financeira.endereco}</TableCell>
                        <TableCell>{financeira.cnpj}</TableCell>
                        <TableCell>{financeira.telefone}</TableCell>
                        <TableCell>
                            <Button onClick={() => this.props.onExcluirFinanceira(financeira)}color="primary">
                                Excluir
                            </Button>
                            <Button onClick={() => this.props.onEditar(financeira)}color="secondary">
                                Editar
                            </Button>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>;
    }
}