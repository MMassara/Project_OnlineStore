import React, { Component } from 'react';
import PropTypes, { string } from 'prop-types';

class Categoria extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoriaChecked: false,
    };
  }

  handleCheck = (event) => {
    const { onClick } = this.props;
    const { categoriaChecked } = this.state;
    if (categoriaChecked) {
      this.setState({ categoriaChecked: false });
    } else {
      this.setState({ categoriaChecked: true });
    }
    onClick(event);
  };

  render() {
    const { name, labelStyle, categoryKey } = this.props;
    const { categoriaChecked } = this.state;

    return (
      <div id={ categoryKey } className='categorySection'>
        {' '}
        <section className='eachCategory'>
        <label htmlFor={ categoryKey } style={ labelStyle } id={ categoryKey }>
          {name}
          {' '}
          <input
            type="radio"
            name="checkbox"
            id={ categoryKey }
            checked={ categoriaChecked }
            onChange={ this.handleCheck }
            data-testid="category"
          />
        </label>
        </section>
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
  onClick: PropTypes.func.isRequired,
  categoryKey: PropTypes.string.isRequired,
};

export default Categoria;
