import React from 'react';
import PropTypes from 'prop-types';

class ProductCard extends React.Component {
  render() {
    const { itemObj: { thumbnail, title, price } } = this.props;
    return (
      <>
        <img src={ thumbnail } alt={ title } data-testid="product" />
        <h3>{title}</h3>
        <h4>{price}</h4>
      </>
    );
  }
}

ProductCard.propTypes = {
  itemObj: PropTypes.shape({
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
