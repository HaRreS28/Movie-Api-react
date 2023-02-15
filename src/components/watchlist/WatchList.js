import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState,useEffect,useContext} from 'react';
import { ThreeDots } from 'react-loader-spinner'
import {useNavigate} from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons'
import './WatchList.css'

const WatchList = ({movieContext}) => {
  const [items,setItems]=useState([]);
  const [isMore,setIsMore]=useState(true)
  const [page,setPage] = useState(0)
  const movies = useContext(movieContext)
  const navigate = useNavigate();

  useEffect(()=>{
   fetchData()
  },[])

  function reviews(id){
    navigate(`/Reviews/${id}`)
}
  
  function fetchData(){
    if(movies.length!=0){
    if(page+3>movies.length){
      setItems(e=>[...e].concat(movies.slice(page,movies.length)))
      setPage(p=>p+3)
      setIsMore(false)
    }  
    else if(page<movies.length){
      setItems(e=>[...e].concat(movies.slice(page,page+3)))
      setPage(p=>p+3)
    }
    else setIsMore(false)
    console.log(movies)
   }
  }

  return (
    <InfiniteScroll 
    dataLength={items.length}
    next={fetchData}
    hasMore={isMore}
    loader={
    <div style={{display:'flex',justifyContent:'center'}}>
      <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="white"
    />
    </div>
    }
    refreshFunction={fetchData}
    pullDownToRefresh
  pullDownToRefreshThreshold={1}
    endMessage={
      <p style={{ textAlign: 'center' }}>
       {isMore ? <div style={{display:'flex',justifyContent:'center'}}><ThreeDots
      height="80"
      width="80"
      radius="9"
      color="white"
    /></div>:  <b>Yay! You have seen it all</b>}
      </p>
    }
   >
    {items.map(item=>{
      return(
        <div className='item-container'>
          <div className='item'>
            <div className='movie-poster'>
              <img src={item.poster} alt=""/>
            </div>
            <div className='movie-title'>
              <h4>{item.title}</h4>
              <Button variant='info' onClick={()=>reviews(item.imdbId)}>Reviews</Button>
            </div>
          </div>
        </div>)})}
        {(isMore &&movies.length!==0) &&<div className='refresh'><FontAwesomeIcon icon={faAnglesDown} 
        style={{cursor:'pointer'}}/></div>}
  </InfiniteScroll>
  )
}

export default WatchList