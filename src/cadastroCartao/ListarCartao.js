import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

export default class ListarCartao extends Component {

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
                {this.props.listarCartao.map(
                    (Cartao) => <TableRow key={Cartao.id}>
                        <TableCell>{Cartao.id}</TableCell>
                        <TableCell>{Cartao.nome}</TableCell>
                        <TableCell>{Cartao.validade}</TableCell>
                        <TableCell>R$ {Cartao.limiteCartao}</TableCell>
                        <TableCell>{Cartao.financeira ? Cartao.financeira.nome : ""}</TableCell>
                        <TableCell>{Cartao.pessoa ? Cartao.pessoa.nome : ""}</TableCell>

                        <TableCell>
                            <Button onClick={() => this.props.onExcluir(Cartao)}color="primary">
                            Excluir
                            </Button>
                            <Button onClick={() => this.props.onEditar(Cartao)}color="secondary">    
                           Editar
                           </Button>
                        </TableCell>

                        </TableRow>
                )}


            </TableBody>
        </Table>;
    }
}