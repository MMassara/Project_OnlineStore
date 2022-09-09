import React from 'react';
import PropTypes from 'prop-types';

class ShoppingCartItem extends React.Component {
  state = {
    itemQuantity: 1,
  };

  handleClick = ({ target }) => {
    const { itemQuantity } = this.state;
    if (itemQuantity === 1 && target.id === 'decrease') {
      return;
    }
    if (target.id === 'decrease') {
      this.setState((prevState) => ({
        itemQuantity: prevState.itemQuantity - 1,
      }));
    } else {
      this.setState((prevState) => ({
        itemQuantity: prevState.itemQuantity + 1,
      }));
    }
  };

  render() {
    const {
      item: { thumbnail, title, price },
      rmItem,
    } = this.props;
    const { itemQuantity } = this.state;
    return (
      <>
        <img src={ thumbnail } alt={ title } />
        <div data-testid="shopping-cart-product-name">
          {title}
          {' '}
          {price}
        </div>
        <button
          type="button"
          onClick={ this.handleClick }
          id="decrease"
          data-testid="product-decrease-quantity"
        >
          -
        </button>
        <span data-testid="shopping-cart-product-quantity">{itemQuantity}</span>
        <button
          type="button"
          onClick={ this.handleClick }
          id="increase"
          data-testid="product-increase-quantity"
        >
          +
        </button>
        <br />
        <button
          type="button"
          onClick={ rmItem }
          data-testid="remove-product"
          id={ title }
        >
          Remover
        </button>
      </>
    );
  }
}

ShoppingCartItem.propTypes = {
  item: PropTypes.shape({
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  rmItem: PropTypes.func.isRequired,
};

export default ShoppingCartItem;
