import React from 'react';
import PropTypes from 'prop-types';

class ProductDetails extends React.Component {
  goCart = () => {
    const { history } = this.props;
    history.push('/shopping-cart');
  };

  render() {
    return (
      <div>
        <button
          type="button"
          data-testid="shopping-cart-button"
          onClick={ this.goCart }
        >
          Carrinho
        </button>
        {itemClicado.map((element) => (
          <div key={ `${element.id}`}>
            <h3 data-testid="product-detail-name">{`${title}`}</h3>
            <img
              src={ `${thumbnail}` }
              alt={ `${title}` }
              data-testid="product-detail-image"
            />
          </div>
          <div>
            <h3>Especificações Técnicas</h3>
            <ul>
              <li>{ `${attributes}`}</li>
              {/* precisa refatorar os detalhes */}
            </ul>
            <h3 data-testid="product-detail-price">{ `${price}` }</h3>
          </div>
        ))}
      </div>
    );
  }
}

ProductDetails.propTypes = {
  history: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ProductDetails;
