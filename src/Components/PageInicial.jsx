import React from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';
import ProductCard from './ProductCard';

class PageInicial extends React.Component {
  state = {
    listaInicial: '',
    searchQuery: '',
    renderItems: [],
    renderData: false,
  };

  handleClick = async () => {
    //faz o fetch da função 'getProductsFromCategoryAndQuery':
    const { searchQuery } = this.state;
    const promise = await getProductsFromCategoryAndQuery(null, searchQuery);
    const data = promise.results;
    const infoToRender = data.length === 0 ? 'Nenhum produto foi encontrado' : data;
    this.setState({
      renderItems: infoToRender,
      renderData: true,
    });
  };

  handleChange = ({ target }) => {
    //salva no estado o input de pesquisa do usuário do usuário
    const { value } = target;
    this.setState({
      searchQuery: value,
    });
  };

  //parei na hora de renderizar os itens para a página inicial. Criei um componente ProductCard para isso.

  render() {
    const { listaInicial, renderItems, renderData } = this.state;
    return (
      <div>
        <input
          type="text"
          data-testid="query-input"
          onChange={this.handleChange}
        />
        <button
          type="button"
          data-testid="query-button"
          onClick={this.handleClick}
        >
          Pesquisar
        </button>
        {listaInicial.length === 0 ? (
          <h3 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h3>
        ) : null} 
      </div>
    );
  }
}

export default PageInicial;
