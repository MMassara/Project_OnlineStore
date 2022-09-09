import React from 'react';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../services/api';
import ProductCard from './ProductCard';
import ListaCategorias from './ListaCategorias';

class PageInicial extends React.Component {
  state = {
    listaInicial: '',
    searchQuery: '',
    renderItems: [],
    loading: false,
  };

  handleClick = async () => {
    // faz o fetch da função 'getProductsFromCategoryAndQuery':
    const { searchQuery } = this.state;
    this.setState({
      loading: true,
    });
    const promise = await getProductsFromCategoryAndQuery(null, searchQuery);
    const data = promise.results;
    this.setState({
      renderItems: data,
      loading: false,
    });
  };

  handleChange = ({ target }) => {
    // salva no estado o input de pesquisa do usuário do usuário
    const { value } = target;
    this.setState({
      searchQuery: value,
    });
  };

  goCart = () => {
    const { history } = this.props;
    history.push('/shopping-cart');
  };

  render() {
    const { listaInicial, renderItems, loading } = this.state;
    const showItems = renderItems.map((item) => (
      <div key={ item.id }>
        <ProductCard itemObj={ item } />
      </div>));
    const errorMessage = <h3>Nenhum produto foi encontrado</h3>;

    return (
      <div>
        <input
          type="text"
          data-testid="query-input"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="query-button"
          onClick={ this.handleClick }
        >
          Pesquisar
        </button>
        {listaInicial.length === 0 ? (
          <h3 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h3>
        ) : null}
        {renderItems.length === 0 ? errorMessage : showItems}
        {loading && <h4>Carregando...</h4>}
        <ListaCategorias />
        <button onClick={ this.goCart } data-testid="shopping-cart-button" type="button">
          Carrinho de compras
        </button>
      </div>
    );
  }
}

PageInicial.propTypes = {
  history: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default PageInicial;
