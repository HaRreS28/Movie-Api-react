import React from 'react'

const WatchList = ({movies}) => {
  return (
    <p>
    {
        movies.map(movie=>{
            return <p>{movie.imdbId}</p>;
        })
    }
    </p>
  )
}

export default WatchList