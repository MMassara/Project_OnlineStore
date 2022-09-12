import React from 'react';
import PropTypes from 'prop-types';

class CheckoutPage extends React.Component {
  state = {
    productsData: [],
    possoSubmeter: false,
    invalidForm: false,
    name: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    paymentMethod: '',
  };

  componentDidMount() {
    const localData = JSON.parse(localStorage.getItem('produto'));
    this.setState({
      productsData: localData,
    });
  }

  handleChange = ({ target }) => {
    const { name, value, type, id } = target;
    const newValue = type === 'radio' ? id : value;
    this.setState({
      [name]: newValue,
    }, () => this.handleValidation());
  };

  handleValidation = () => {
    const stateValues = Object.values(this.state);
    this.setState({
      possoSubmeter: true,
    });
    const firstIndex = 3;
    for (let i = firstIndex; i < stateValues.length; i += 1) {
      if (stateValues[i].length === 0) {
        this.setState({
          possoSubmeter: false,
        });
      }
    }
  };

  handleClick = () => {
    const { possoSubmeter } = this.state;
    const { history } = this.props;
    if (possoSubmeter) {
      localStorage.clear();
      history.push('/');
    } else {
      this.setState({
        invalidForm: true,
      });
    }
  };

  render() {
    const { productsData, invalidForm } = this.state;
    const products = productsData.map((product) => (
      <li key={ product.title }>
        <img src={ product.thumbnail } alt={ product.title } />
        <h5>{product.title}</h5>
        <h6>{product.price}</h6>
      </li>
    ));
    return (
      <div>
        <section>
          <h3>Resumo dos produtos</h3>
          <ul>{products}</ul>
        </section>
        { invalidForm && <h3 data-testid="error-msg">Campos inválidos</h3>}
        <form>
          <input
            type="text"
            placeholder="Nome completo"
            data-testid="checkout-fullname"
            name="name"
            onChange={ this.handleChange }
          />
          <input
            type="email"
            placeholder="Email"
            data-testid="checkout-email"
            name="email"
            onChange={ this.handleChange }
          />
          <input
            type="text"
            placeholder="CPF"
            data-testid="checkout-cpf"
            name="cpf"
            onChange={ this.handleChange }
          />
          <input
            type="text"
            placeholder="Telefone"
            data-testid="checkout-phone"
            name="phone"
            onChange={ this.handleChange }
          />
          <input
            type="text"
            placeholder="CEP"
            data-testid="checkout-cep"
            name="cep"
            onChange={ this.handleChange }
          />
          <input
            type="text"
            placeholder="Endereço"
            data-testid="checkout-address"
            name="address"
            onChange={ this.handleChange }
          />
          <h3>Método de pagamento</h3>
          <br />
          <label htmlFor="boleto">
            <input
              type="radio"
              name="paymentMethod"
              data-testid="ticket-payment"
              id="boleto"
              onChange={ this.handleChange }
            />
            Boleto
          </label>
          <label htmlFor="visa">
            <input
              type="radio"
              name="paymentMethod"
              data-testid="visa-payment"
              id="visa"
              onChange={ this.handleChange }
            />
            Visa
          </label>
          <label htmlFor="MasterCard">
            <input
              type="radio"
              name="paymentMethod"
              data-testid="master-payment"
              id="MasterCard"
              onChange={ this.handleChange }
            />
            MasterCard
          </label>
          <label htmlFor="Elo">
            <input
              type="radio"
              name="paymentMethod"
              data-testid="elo-payment"
              id="Elo"
              onChange={ this.handleChange }
            />
            Elo
          </label>
          <br />
          <button type="button" data-testid="checkout-btn" onClick={ this.handleClick }>
            Comprar
          </button>
        </form>
      </div>
    );
  }
}

CheckoutPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default CheckoutPage;
