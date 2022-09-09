import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductCard extends React.Component {
  render() {
    const { itemObj: { thumbnail, title, price } } = this.props;
    return (
      <Link to="/productdetails" data-testid="product-detail-link">
        <div data-testid="product">
          <img src={ thumbnail } alt={ title } />
          <h3>{title}</h3>
          <h4>{price}</h4>
        </div>
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
