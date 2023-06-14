import React, { useEffect, useState } from 'react'
import "./rowPost.css"
import axios from '../../axios'
import {API_KEY,imageURL} from '../../constants/constants'
import Youtube from 'react-youtube'

function RowPost(props) {
  
  const [movies , setMovies] = useState([])
  const [urlId , setUrlId] = useState('')
  const [showVideo ,setShowVideo] = useState(true)

  useEffect(()=>{
      axios.get(props.url).then((res)=>{
          setMovies(res.data.results);
      })
  })

  const opts = {
    playerVars: {
      autoplay: 1,
    }
  };

  const handleMovie =(id)=>{
      axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((res)=>{
        if(res.data.results.length !== 0){
            setUrlId(res.data.results[0].key)
            setShowVideo(true)
        }else{
          axios.get(`tv/${id}/videos?api_key=${API_KEY}&language=en-US`).then((res)=>{
          if(res.data.results.length !== 0){
            setUrlId(res.data.results[0].key)
            setShowVideo(true)
          }else{
            alert('Trailer not available!!')
          }
        })}
      })
  }

  const closeYoutube=()=>{
    setShowVideo(false)
  }

  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className='posters'>
        {
          movies.map((obj ,index)=>{
           return <img onClick={()=>handleMovie(obj.id)} className={props.isSmall ? 'smallPoster'  :'poster'} src={`${imageURL+obj.backdrop_path}`} alt="poster" />
          })
        }
      </div>
      {showVideo && urlId && (
          <div className="youtube">
          <Youtube className='youtube-video' opts={opts} videoId={urlId}/>
          <button onClick={closeYoutube} className='closeButton'>X</button>
          </div>
      )} 
    </div>
  )
}

export default RowPost
