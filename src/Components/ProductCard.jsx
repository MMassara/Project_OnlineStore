import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductCard extends React.Component {
  componentDidMount() {
    if (localStorage.getItem('produto') === null) {
      localStorage.setItem('produto', JSON.stringify([]));
    }
  }

  saveIdLocalStorage = () => {
    const {
      itemObj: { id },
    } = this.props;
    localStorage.setItem('detail', id);
  };

  addToCart = () => {
    const { itemObj, showCart } = this.props;
    // const availableQuantity = itemObj.available_quantity;
    // console.log(available_quantity);
    const allItems = JSON.parse(localStorage.getItem('produto'));
    allItems.push(itemObj);
    localStorage.setItem('produto', JSON.stringify(allItems));
    showCart();
  };

  render() {
    const {
      itemObj: {
        thumbnail,
        title,
        price,
        shipping: { free_shipping: freeShipping },
      },
    } = this.props;

    const productCardStyle = {
      border: 'solid black 5px',
      margin: '5px',
      padding: '5px',
      height: '296px',
    };

    return (
      <div style={ productCardStyle }>
        <Link
          to="/productdetails"
          data-testid="product-detail-link"
          onClick={ this.saveIdLocalStorage }
          style={ { fontSize: '12px' } }
        >
          <div
            data-testid="product"
            style={ { display: 'flex', flexDirection: 'column' } }
          >
            <img
              src={ thumbnail }
              alt={ title }
              style={ { alignSelf: 'center', height: '30%' } }
            />
            <h3>{title}</h3>
            <h4>{price}</h4>
          </div>
        </Link>
        {freeShipping && <h3 data-testid="free-shipping">Frete Grátis</h3>}
        <button
          type="button"
          onClick={ this.addToCart }
          data-testid="product-add-to-cart"
        >
          Adicionar ao carrinho!
        </button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  itemObj: PropTypes.shape({
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    id: PropTypes.string,
    shipping: PropTypes.shape({
      free_shipping: PropTypes.bool,
    }),
  }).isRequired,
  showCart: PropTypes.func.isRequired,
};

export default ProductCard;
