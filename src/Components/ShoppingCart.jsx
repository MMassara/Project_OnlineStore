import React from 'react';

class ShoppingCart extends React.Component {
  state = {
    selectedItems: [],
  };

  componentDidMount() {
    this.getSelectedItem();
  }

  getSelectedItem = () => {
    const selectedProducts = JSON.parse(localStorage.getItem('produto'));
    if (selectedProducts !== null) {
      this.setState({
        selectedItems: selectedProducts,
      });
    }
  };

  render() {
    const { selectedItems } = this.state;
    const showSelectedItems = selectedItems.map((product) => (
      <section key={ product.title }>
        <img src={ product.thumbnail } alt={ product.title } />
        <div data-testid="shopping-cart-product-name">
          {product.title}
          {' '}
          {product.price}
        </div>
        <span data-testid="shopping-cart-product-quantity">
          {product.quantity}
        </span>
      </section>
    ));
    return (
      <div>
        {selectedItems.length === 0 ? (
          <h3 data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </h3>
        ) : (
          showSelectedItems
        )}
      </div>
    );
  }
}

export default ShoppingCart;
