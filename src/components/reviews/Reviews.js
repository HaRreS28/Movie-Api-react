import React from "react";
import { useEffect, useRef, useState } from "react";
import api from "../../api/axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from "../reviewForm/ReviewForm";
import authHeader from "../../api/authHeader";
import authService from "../../api/authService";

const Reviews = () => {
  const revText = useRef();
  const params = useParams();
  const movieId = params.movieId;
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMovieData(movieId);
  }, []);

  const getMovieData = async (movieId) => {
    try {
      const response = await api.get(`/api/v1/movies/${movieId}`);
      const singleMovie = response.data;
      setMovie(singleMovie);
      console.log(singleMovie);
      setReviews(singleMovie.reviewIds);
    } catch (error) {
      console.log(error);
      navigate(`/error`);
    }
  };

  const addReview = async (e) => {
    e.preventDefault();
    const rev = revText.current;

    try {
      const response = await api.post(
        "/api/v1/reviews",
        { body: rev.value, movieImdb: movieId },
        { headers: authHeader() }
      );

      const updatedReviews = [
        ...reviews,
        { author: authService.getCurrentUser().email, body: rev.value },
      ];

      rev.value = "";

      setReviews(updatedReviews);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>Reviews</h3>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <img src={movie?.poster} alt="" />
        </Col>
        <Col>
          {
            <>
              <Row>
                <Col>
                  <ReviewForm
                    handleSubmit={addReview}
                    revText={revText}
                    labelText="Write a Review?"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
            </>
          }
          {reviews?.map((e) => {
            return (
              <>
                <Row>
                  <Col>
                    {
                      <div className="review-body">
                        <p
                          style={{
                            color:
                              authService.getCurrentUser() &&
                              e.author == authService.getCurrentUser().email
                                ? "#ffe333"
                                : "#cd6155",
                          }}
                        >
                          {e.author}
                        </p>
                        <p>{e.body}</p>
                      </div>
                    }
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <hr />
                  </Col>
                </Row>
              </>
            );
          })}
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default Reviews;
