import React from 'react';

class ShoppingCart extends React.Component {
  state = {
    selectedItems: [],
  };

  render() {
    const { selectedItems } = this.state;
    return (
      <div>
        {selectedItems.length === 0
          ? <h3 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h3>
          : null}
      </div>
    );
  }
}

export default ShoppingCart;
