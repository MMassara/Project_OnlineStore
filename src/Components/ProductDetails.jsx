import React from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

class ProductDetails extends React.Component {
  state = {
    detailProduct: [],
  };

  async componentDidMount() {
    await this.getProductStorage();
  }

  goCart = () => {
    const { history } = this.props;
    history.push('/shopping-cart');
  };

  getProductStorage = async () => {
    const getProduct = localStorage.getItem('detail');
    const selectedProduct = await getProductById(getProduct);
    this.setState({
      detailProduct: [selectedProduct],
    });
  };

  render() {
    const { detailProduct } = this.state;

    return (
      <div>
        <button
          type="button"
          data-testid="shopping-cart-button"
          onClick={ this.goCart }
        >
          Carrinho
        </button>

        {detailProduct.map((element) => (
          <div key={ `${element.id}` }>
            <div>
              <h3 data-testid="product-detail-name">{`${element.title}`}</h3>
              <img
                src={ `${element.thumbnail}` }
                alt={ `${element.title}` }
                data-testid="product-detail-image"
              />
            </div>
            <div>
              <h3 data-testid="product-detail-price">{ `${element.price}` }</h3>
            </div>
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
