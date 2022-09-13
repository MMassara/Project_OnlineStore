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

    return (
      <div>
      <div>
        <div className='cartItem'>
        <Link
          to="/productdetails"
          data-testid="product-detail-link"
          onClick={ this.saveIdLocalStorage }
          className='linkImage'
        >
          <div
            data-testid="product"
          >
            <img
              src={ thumbnail }
              alt={ title }
              className='imagesCard'
            />
            <h3>{title}</h3>
            <h4>R$ {price}</h4>
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
      </div>
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
