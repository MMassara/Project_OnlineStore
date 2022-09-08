import React from 'react';

class PageInicial extends React.Component {
  state = {
    listaInicial: '',
  };

  render() {
    const { listaInicial } = this.state;
    return (
      <div>
        <input type="text" />
        {listaInicial.length === 0 ? (
          <h3 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h3>
        ) : null }
      </div>
    );
  }
}

export default PageInicial;
