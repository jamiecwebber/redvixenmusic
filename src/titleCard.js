import React from 'react';
// import ReactDOM from 'react-dom';
import './titleCard.scss';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const TitleCard = () => {
  return(
    <div className='home-page'>
      <h3 className='name-text'>welcome to the personal site of</h3>
      <h1 className="name-text">Jamie Christopher Webber</h1>
     
      <div className="subtitles">
        <Link to='/dev/'><h2 className='name-link'>web developer</h2></Link>
        <Link to='/music/'><h2 className='name-link'>composer/improviser</h2></Link>
        <Link to='/audio/'><h2 className='name-link'>creative audio programmer</h2></Link>
      </div>
      <br/>
    </div>
  )
}

export default TitleCard;