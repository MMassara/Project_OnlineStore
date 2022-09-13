import React from "react";
import PropTypes from "prop-types";
import { getProductsFromCategoryAndQuery } from "../services/api";
import ProductCard from "./ProductCard";
import ListaCategorias from "./ListaCategorias";

class PageInicial extends React.Component {
  state = {
    listaInicial: "",
    searchQuery: "",
    renderItems: [],
    loading: false,
    category: "",
    itemsInCart: [],
  };

  componentDidMount() {
    this.showItemsCart();
  }

  showItemsCart = () => {
    const itemsCart = JSON.parse(localStorage.getItem("produto"));
    if (itemsCart !== null) {
      this.setState({
        itemsInCart: itemsCart.length,
      });
    }
  };

  handleClick = async () => {
    // faz o fetch da função 'getProductsFromCategoryAndQuery':
    const { searchQuery, category } = this.state;
    this.setState({
      loading: true,
    });
    const promise = await getProductsFromCategoryAndQuery(
      category,
      searchQuery
    );
    const data = promise.results;
    this.setState({
      renderItems: data,
      loading: false,
    });
  };

  handleChange = ({ target }) => {
    // salva no estado o input de pesquisa do usuário do usuário
    const { value } = target;
    this.setState({
      searchQuery: value,
    });
  };

  selectCategory = ({ target }) => {
    // salva estado
    const newItem = target.id;
    this.setState(
      {
        category: newItem,
      },
      () => this.callApi()
    );
  };

  callApi = async () => {
    const { category, searchQuery } = this.state;
    const promise = await getProductsFromCategoryAndQuery(
      category,
      searchQuery
    );
    const data = promise.results;
    this.setState({
      renderItems: data,
    });
  };

  goCart = () => {
    const { history } = this.props;
    history.push("/shopping-cart");
  };

  render() {
    const { listaInicial, renderItems, loading, itemsInCart } = this.state;
    const showItems = renderItems.map((item) => (
      <div key={item.id}>
        <ProductCard itemObj={item} showCart={this.showItemsCart} />
      </div>
    ));
    const errorMessage = <h3 className="initialMessage">Nenhum produto foi encontrado</h3>;

    return (
      <div>
        <div className="searchingArea">
          <div>
            <input
              id="search"
              name="search"
              type="text"
              data-testid="query-input"
              onChange={this.handleChange}
              className='inputSearch'
            />
            <button
              type="button"
              data-testid="query-button"
              onClick={this.handleClick}
            >
              {" "}
              Procurar
            </button>
          </div>
          <button
            onClick={this.goCart}
            data-testid="shopping-cart-button"
            type="button"
          >
            Carrinho de compras(
            <span data-testid="shopping-cart-size">{itemsInCart}</span>)
          </button>
        </div>
        {listaInicial.length === 0 ? (
          <h3 data-testid="home-initial-message" className="initialMessage">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h3>
        ) : null}
        <div className="cartArea">
          {renderItems.length === 0 ? errorMessage : showItems}
          {loading && <h4>Carregando...</h4>}
        </div>
        <ListaCategorias selectCategory={this.selectCategory} />
      </div>
    );
  }
}

PageInicial.propTypes = {
  history: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default PageInicial;
