import React from 'react'
import { useEffect,useRef } from 'react'
import api from '../../api/axiosConfig'
import {useParams} from 'react-router-dom'
import {Container,Row,Col} from 'react-bootstrap'
import ReviewForm from '../reviewForm/ReviewForm'

const Reviews = ({getMovieData,movie,reviews,setReviews}) => {

    const revText = useRef();
    const params = useParams();
    const movieId = params.movieId;
    const addReview = async (e)=>{
        e.preventDefault();
        const rev = revText.current;

        try{
        const response = await api.post('/api/v1/reviews',{body:rev.value,movieImdb:movieId});

        const updatedReviews = [...reviews,{body:rev.value}];

        rev.value = "";

        setReviews(updatedReviews)
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getMovieData(movieId);
    },[])

  return (
    <Container>
        <Row>
            <Col><h3>Reviews</h3></Col>
        </Row>
        <Row className='mt-2'>
            <Col>
                <img src='movie?.poster' alt=''/>
            </Col>
            <Col>
            {
                <>
                    <Row>
                        <ReviewForm handleSubmit={addReview} revText={revText} labelText = "Write a Review?"/>
                    </Row>
                    <Row>
                        <Col>
                            <hr/>
                        </Col>
                    </Row>
                </>
            }
            {
                reviews?.map((e)=>{
                    return(
                        <>
                            <Row>
                                <Col>{r.body}</Col>
                            </Row>
                            <Row>
                        <Col>
                            <hr/>
                        </Col>
                    </Row>
                        </>
                    )
                })
            }
            </Col>
        </Row>
    </Container>
  )
}

export default Reviews