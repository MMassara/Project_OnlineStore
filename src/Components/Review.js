import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StarRating from './StarRating';

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      consumerEmail: '',
      review: '',
      validEmail: false,
      consumerRating: 0,
      hover: 0,
      validRating: false,
      postReviews: [],
    };
  }

  // handleFromLocalStorage = () => {
  //   const { productId } = this.props;
  //   if(localStorage.getItem(productId))
  // }

  componentDidMount() {
    const { productId } = this.props;
    const savedReviews = JSON.parse(localStorage.getItem(productId));
    if (savedReviews) {
      this.setState({
        postReviews: [...savedReviews],
      });
    }
  }

  handleEmailValidation = (e) => {
    const { consumerEmail } = this.state;

    this.setState({
      consumerEmail: e.target.value,
    });

    const pattern = consumerEmail
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );

    if (pattern) {
      this.setState({
        validEmail: true,
      });
    }
  };

  handleRating = (stars) => {
    this.setState({
      consumerRating: stars,
      validRating: true,
    });
  };

  handleHover = (stars) => {
    this.setState({
      hover: stars,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { consumerEmail, review, consumerRating, postReviews } = this.state;
    const { productId } = this.props;
    const post = { email: consumerEmail, text: review, rating: consumerRating };
    console.log(productId);

    this.setState((prevState) => ({
      postReviews: [...prevState.postReviews, post],
      consumerEmail: '',
      review: '',
      consumerRating: 0,
    }));
    localStorage.setItem(productId, JSON.stringify(postReviews));
  };

  render() {
    const { hover, validRating, postReviews, review } = this.state;
    const { consumerEmail, validEmail, consumerRating } = this.state;
    const ableButton = validEmail && validRating;
    return (
      <div style={ { margin: '5px', border: 'solid black 4px' } }>
        {!ableButton && <p data-testid="error-msg">Campos inválidos</p>}
        <form onSubmit={ () => e.target.reset() }>
          <div>
            <label htmlFor="email">
              Email:
              {' '}
              <input
                data-testid="product-detail-email"
                type="email"
                name="email"
                id="email"
                onChange={ this.handleEmailValidation }
                value={ consumerEmail }
              />
            </label>
            <StarRating
              handleRating={ this.handleRating }
              handleHover={ this.handleHover }
              rating={ consumerRating }
              hover={ hover }
            />
          </div>
          <label htmlFor="comment">
            <textarea
              data-testid="product-detail-evaluation"
              name="comment"
              id="comment"
              cols="150"
              rows="10"
              value={ review }
              onChange={ (e) => {
                this.setState({ review: e.target.value });
              } }
            />
          </label>
          <button
            data-testid="submit-review-btn"
            type="submit"
            disabled={ !ableButton }
            onClick={ this.handleSubmit }
          >
            Avaliar
          </button>
        </form>
        {postReviews.length > 0
          && postReviews.map((post, index) => (
            <div key={ index }>
              <h4 data-testid="review-card-email">{post.email}</h4>
              <div data-testid="review-card-evaluation" className="star-rating">
                {[...Array(post.rating)].map((star, index2) => {
                  index2 += 1;
                  return (
                    <button
                      data-testid="review-card-rating"
                      type="button"
                      key={ index2 }
                      className="on"
                    >
                      <span className="star">&#9733;</span>
                    </button>
                  );
                })}
              </div>
              <p>{post.text}</p>
            </div>
          ))}
      </div>
    );
  }
}

Review.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default Review;
