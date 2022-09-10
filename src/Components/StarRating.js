import React from 'react';

class StarRating extends React.Component {
  //   const [rating, setRating] = useState(0);
  //   const [hover, setHover] = useState(0);

  //   handleRating = (stars) => {
  //     this.setState({
  //         rating: stars,
  //     })
  //   };

  //   handleHover = (stars) => {
  //     this.setState({
  //         hover: stars,
  //     })
  //   }

  render() {
    const magicNumber = 5;
    const { hover, rating, handleRating, handleHover } = this.props;
    return (
      <div className="star-rating">
        {[...Array(magicNumber)].map((star, index) => {
          index += 1;
          return (
            <button
            data-testid="${index}-rating"
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

export default StarRating;
