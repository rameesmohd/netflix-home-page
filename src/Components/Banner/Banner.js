import React, { useEffect, useState } from 'react'
import './Banner.css'
import axios from '../../axios'
import {API_KEY,imageURL} from '../../constants/constants' 

function Banner() {
  const [movie ,setMovie] = useState([])
  const [currIndex ,setCurrIndex] = useState(0)
 

  useEffect(() => {
    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`)
      .then((res) => {
        setMovie(res.data.results)
      }).catch((error) => {
        console.log(error);
      });
      // const interval = setInterval(() => {
      //   setCurrIndex((index) => {
      //     if (index >= movie.length - 1) {
      //       return 0;
      //     }
      //     return index + 1;
      //   });
      // },1000);

      // return () => {
      //   console.log("unmounted");
      //   clearInterval(interval)
      // }
  },[]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("ggsdac");
      setCurrIndex((index) => {
        if (index >= movie.length - 1) {
          return 0;
        }
        return index + 1;
      });
    },5000);
  
    return () => {
      clearInterval(interval)}
  },[]);
  
  const currMovie = movie[currIndex]

  return (
    <div 
    style={{backgroundImage:`url(${currMovie ? imageURL+currMovie.backdrop_path : ""})`}}
    className='banner'>
        <div className='content'>
           <h1 className='title'>{currMovie ? currMovie.title : ""}</h1>
           <div className='bannner_buttons'>
                <button className='buttons'>Play</button>
                <button className='buttons'>My List</button>
           </div>
           <h3 className='description'>{currMovie ? currMovie.overview : ""}</h3>
        </div>
    <div className="fade_bottom"></div>
    </div>
  )
}

export default Banner
