import React from 'react'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import './Trailer.css'


const Trailer = () => {
    const params = useParams();
    const key = params.ytTrailerId;
    const url = 'https://www.youtube.com/watch?v=';
  return (
    <div className='react-player-container'>
        {key ? <ReactPlayer controls='true' playing={true} url={url.concat(key)} width='100%' height='100%'/>:null}
    </div>
  )
}

export default Trailer