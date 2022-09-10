import React, { Component } from 'react';
import StarRating from './StarRating';

export default class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      review: '',
      validEmail: false,
      rating: 0,
      hover: 0,
      validRating: false,
      postReviews: [],
    };
  }

  handleEmailValidation = (e) => {
    const { email } = this.state;

    this.setState({
      email: e.target.value,
    });

    const pattern = email
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
      rating: stars,
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
    const { email, review, rating } = this.state;
    const post = { userEmail: email, userReview: review, userScore: rating };

    this.setState((prevState) => ({
      postReviews: [...prevState.postReviews, post],
      email: '',
      review: '',
      rating: 0,
    }));
  };

  render() {
    const { validEmail, rating, hover, validRating, postReviews } = this.state;
    const ableButton = validEmail && validRating;

    return (
      <div>
        {ableButton && <p data-testid="error-msg">Campos inválidos</p>}
        <form>
          <div>
            <label htmlFor="email">
              Email:
              <input
                data-testid="product-detail-email"
                type="email"
                name="email"
                id="email"
                onChange={ this.handleEmailValidation }
              />
            </label>
            <StarRating
              handleRating={ this.handleRating }
              handleHover={ this.handleHover }
              rating={ rating }
              hover={ hover }
            />
          </div>
          <label htmlFor="comment">
            <textarea
              data-testid="product-detail-evaluation"
              name="comment"
              id="comment"
              cols="30"
              rows="10"
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
        {postReviews
          && postReviews.map((post, index) => (
            <div key={ index }>
              <h4 data-testid="review-card-email">{post.userEmail}</h4>
              <div data-testid="review-card-evaluation" className="star-rating">
                {[...Array(post.userScore)].map((star, index2) => {
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
              <p>{post.userReview}</p>
            </div>
          ))}
      </div>
    );
  }
}
