import React, { Component } from 'react';
import PropTypes, { string } from 'prop-types';

class Categoria extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoriaChecked: false,
    };
  }

  handleCheck = () => {
    const { categoriaChecked } = this.state;
    if (categoriaChecked) {
      this.setState({ categoriaChecked: false });
    } else {
      this.setState({ categoriaChecked: true });
    }
  };

  render() {
    const { name, labelStyle } = this.props;
    const { categoriaChecked } = this.state;

    return (
      <>
        {' '}
        <label htmlFor={ `${name} checkbox` } style={ labelStyle } data-testid="category">
          <p>
            {name}
            {' '}
          </p>
          <input
            type="checkbox"
            name={ `${name} checkbox` }
            id={ `${name} checkbox` }
            checked={ categoriaChecked }
            onChange={ this.handleCheck }
          />
        </label>
      </>
    );
  }
}

Categoria.propTypes = {
  name: PropTypes.string.isRequired,
  labelStyle: PropTypes.shape({
    display: string,
    flexDirection: string,
    justifyContent: string,
    alignContent: string,
    width: string,
    border: string,
    margin: string,
    padding: string,
  }).isRequired,
};

export default Categoria;
