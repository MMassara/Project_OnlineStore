import React from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartItem from './ShoppingCartItem';

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

  removeItem = ({ target }) => {
    const selectedProducts = JSON.parse(localStorage.getItem('produto'));
    const newArr = selectedProducts.filter((product) => product.title !== target.id);
    localStorage.setItem('produto', JSON.stringify(newArr));
    this.setState({
      selectedItems: newArr,
    });
  };

  render() {
    const { selectedItems } = this.state;
    // console.log(selectedItems[0]);
    const showSelectedItems = selectedItems.map((product) => (
      <section key={ product.title }>
        <ShoppingCartItem item={ product } rmItem={ this.removeItem } />
      </section>
    ));
    return (
      <div>
        <h2>Carrinho de Compras: </h2>
        {selectedItems.length === 0 ? (
          <h3 data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </h3>
        ) : (
          showSelectedItems
        )}
        <Link to="/checkout">
          <button type="button" data-testid="checkout-products">Comprar</button>
        </Link>
      </div>
    );
  }
}

export default ShoppingCart;
