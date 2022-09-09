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
    const { name, labelStyle, categoryKey } = this.props;
    const { categoriaChecked } = this.state;

    return (
      <div id={ categoryKey }>
        {' '}
        <label htmlFor={ categoryKey } style={ labelStyle } data-testid="category" id={ categoryKey } >
          {name}
          {' '}
          <input
            type="radio"
            name={ `${name} checkbox` }
            id={ categoryKey }
            checked={ categoriaChecked }
            onClick={ this.props.onClick }
            onChange={ this.handleCheck }
          />
        </label>
      </div>
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
