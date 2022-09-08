import React from 'react';
import ListaCategorias from './ListaCategorias'
import PropTypes from 'prop-types';


class PageInicial extends React.Component {
  state = {
    listaInicial: '',
  };

  goCart = () => {
    const { history } = this.props;
    history.push('/shopping-cart');
  };

  render() {
    const { listaInicial } = this.state;
    return (
      <div>
        <input type="text" />
        {listaInicial.length === 0 ? (
          <h3 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h3>
        ) : null }
        <ListaCategorias />
        ) : null}
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
