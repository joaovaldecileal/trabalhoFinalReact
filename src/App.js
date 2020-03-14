import React, { Component } from 'react';
import UsuarioPai from './cadastraUsuario/UsuarioPai';
import PessoaPai from './cadastraPessoa/PessoaPai';
import FinanceiraPai from './cadastroFinanceira/FinanceiraPai';
import CartaoPai from './cadastroCartao/CartaoPai'
import {BrowserRouter as Router,Route,NavLink} from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      selecionado: "",
      menu: [

        {
          nome: "USUARIO",
          componente: UsuarioPai
        },
        {
          nome: "CLIENTE",
          componente: PessoaPai
        },
        {
          nome: "FINANCEIRA",
          componente: FinanceiraPai
        },
        {
          nome:"CARTÃO DE CREDITO",
          componente: CartaoPai
        }
      ]
    };
  }
  render() {
    return <Router><div>
      <nav>
        <ul>
          {this.state.menu.map((menu, indice) =>
            <li><NavLink key={menu.nome} to={"/" + indice} activeClassName="selecionado">
              {menu.nome}</NavLink>
            </li>
          )}
        </ul>
      </nav>
      {this.state.menu.map(
        (menu, indice) => <Route path={"/" + indice} component={menu.componente} />
      )}
    </div></Router>;
  }
}
export default App;
