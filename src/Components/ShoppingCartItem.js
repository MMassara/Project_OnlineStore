import React from 'react';
import PropTypes from 'prop-types';

class ShoppingCartItem extends React.Component {
  state = {
    itemQuantity: 1,
  };

  handleClick = ({ target }) => {
    const { itemQuantity } = this.state;
    const {
      item,
    } = this.props;
    // console.log(availableQuantity);
    // console.log(this.props);
    // if (itemQuantity === 1 && target.id === 'decrease') {
    //   return;
    // }
    const availableQuantity = item.available_quantity;
    if (target.id === 'decrease' && itemQuantity >= 2) {
      this.setState((prevState) => ({
        itemQuantity: prevState.itemQuantity - 1,
      }));
    } else if (target.id === 'increase' && itemQuantity < availableQuantity) {
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
    // const enoughStock = itemQuantity < availableQuantity;
    return (
      <div>
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
          // disabled={ !enoughStock }
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
      </div>
    );
  }
}

ShoppingCartItem.propTypes = {
  item: PropTypes.shape({
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    available_quantity: PropTypes.number,
  }).isRequired,
  rmItem: PropTypes.func.isRequired,
};

export default ShoppingCartItem;
