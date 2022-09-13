import React from 'react';
import PropTypes from 'prop-types';

class StarRating extends React.Component {

  render() {
    const magicNumber = 5;
    const { hover, rating, handleRating, handleHover } = this.props;
    return (
      <div className="star-rating">
        {[...Array(magicNumber)].map((star, index) => {
          index += 1;
          return (
            <button
              data-testid={ `${index}-rating` }
              type="button"
              key={ index }
              className={ index <= (hover || rating) ? 'on' : 'off' }
              onClick={ () => handleRating(index) }
              onMouseEnter={ () => handleHover(index) }
              onMouseLeave={ () => handleHover(rating) }
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </div>
    );
  }
}

StarRating.propTypes = {
  hover: PropTypes.number,
  rating: PropTypes.number,
  handleRating: PropTypes.func,
  handleHover: PropTypes.func,
}.isRequired;

export default StarRating;
