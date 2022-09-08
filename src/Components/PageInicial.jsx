import React from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';
import ProductCard from './ProductCard';

class PageInicial extends React.Component {
  state = {
    listaInicial: '',
    searchQuery: '',
    renderItems: [],
    renderData: false,
    loading: false,
  };

  handleClick = async () => {
    //faz o fetch da função 'getProductsFromCategoryAndQuery':
    const { searchQuery } = this.state;
    this.setState({
      loading:true
    })
    const promise = await getProductsFromCategoryAndQuery(null, searchQuery);
    const data = promise.results;
    this.setState({
      renderItems: data,
      renderData: true,
      loading:false,
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
    const { listaInicial, renderItems, renderData, loading } = this.state;
    const showItems = renderItems.map((item) => <div key={item.id}><img src={item.thumbnail
    } alt={item.title} data-testid="product"/>{item.title} R${item.price}</div>)
    const errorMessage = <h3>Nenhum produto foi encontrado</h3>

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
        {renderItems.length === 0 && renderData === true ? errorMessage : showItems}
        {loading && <h4>Carregando...</h4>}
      </div>
    );
  }
}

export default PageInicial;
