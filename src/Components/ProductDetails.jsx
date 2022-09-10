import React from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

class ProductDetails extends React.Component {
  state = {
    detailProduct: [],
  };

  async componentDidMount() {
    await this.getProductStorage();
    if (localStorage.getItem('produto') === null) {
      localStorage.setItem('produto', JSON.stringify([]));
    }
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

  handleClick = () => {
    const { detailProduct } = this.state;
    const { price, title, thumbnail } = detailProduct[0];
    const allItems = JSON.parse(localStorage.getItem('produto'));
    allItems.push({ price, title, thumbnail });
    localStorage.setItem('produto', JSON.stringify(allItems));
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
              <h3 data-testid="product-detail-price">{`${element.price}`}</h3>
            </div>
            <button
              type="button"
              onClick={ this.handleClick }
              data-testid="product-detail-add-to-cart"
            >
              Adicionar ao Carrinho
            </button>
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
