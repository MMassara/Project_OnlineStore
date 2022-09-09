import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductCard extends React.Component {
  componentDidMount() {
    if (localStorage.getItem('produto') === null) {
      localStorage.setItem('produto', JSON.stringify([]));
    }
  }

  addToCart = () => {
    const {
      itemObj: { thumbnail, title, price },
    } = this.props;
    const allItems = JSON.parse(localStorage.getItem('produto'));
    allItems.push({ price, title, thumbnail, quantity: 1 });
    localStorage.setItem('produto', JSON.stringify(allItems));
  };

  render() {
    const {
      itemObj: { thumbnail, title, price },
    } = this.props;

    return (
      <Link to="/productdetails" data-testid="product-detail-link">
        <div data-testid="product">
          <img src={ thumbnail } alt={ title } />
          <h3>{title}</h3>
          <h4>{price}</h4>
        </div>
         <button
          type="button"
          onClick={ this.addToCart }
          data-testid="product-add-to-cart"
        >
          Adicionar ao carrinho!
        </button>
      </Link>
    );
  }
}

ProductCard.propTypes = {
  itemObj: PropTypes.shape({
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};

export default ProductCard;
