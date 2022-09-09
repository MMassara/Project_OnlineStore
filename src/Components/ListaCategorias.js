import React, { Component } from 'react';
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
    this.setState({
      categorias: [...data],
      loading: false,
    });
  };

  render() {
    const { categorias, loading } = this.state;
    const labelStyle = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      width: '200px',
      border: 'solid black 3px',
      margin: '5px',
      padding: '5px',
    };
    return (
      <div>
        Categorias:
        {' '}
        <ul>
          {loading ? (
            <Loading />
          ) : (
            categorias.map((categoria) => (
              <li key={ categoria.id }>
                <Categoria name={ categoria.name } labelStyle={ labelStyle } onClick={ this.props.selectCategory } categoryKey={ categoria.id } />
              </li>
            ))
          )}
        </ul>
      </div>
    );
  }
}

export default ListaCategorias;
