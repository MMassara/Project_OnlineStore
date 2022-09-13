import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { getCategories } from '../services/api';
import Categoria from './Categoria';

class ListaCategorias extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      categorias: [],
    };
  }

  componentDidMount() {
    this.handleCategories();
  }

  handleCategories = async () => {
    const data = await getCategories();
    console.log(data)
    this.setState({
      categorias: [...data],
      loading: false,
    });
  };

  render() {
    const { categorias, loading } = this.state;
    const { selectCategory } = this.props;
    
    return (
      <div className='allCategory'>
        <h4 id='text-category'>Categorias:</h4>
        {' '}
        <div className='categoryArea'>
          {loading ? (
            <Loading />
          ) : (
            categorias.map((categoria) => (
              <div key={ categoria.id }>
                <Categoria
                  name={ categoria.name }
                  onClick={ selectCategory }
                  categoryKey={ categoria.id }
                />
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

ListaCategorias.propTypes = {
  selectCategory: PropTypes.func.isRequired,
};

export default ListaCategorias;
