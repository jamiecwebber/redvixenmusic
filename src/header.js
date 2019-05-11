import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './header.css'
import logo from './images/fox-logo.png'

class Header extends Component {
	render () {
		return (
			<div id='header'>
				<div className="headerSections">
					<img className='logo' src={logo} alt=''/> 
					<Link to="/redvixenmusic">
						<h1 className='title'>Red Vixen Music</h1>
					</Link>
				</div>
				<div className="headerSections">
					<Link to="/redvixenmusic"><h2>home</h2></Link>
					<Link to="/dev/"><h2>web development</h2></Link>
					<Link to="/music/"><h2>composition</h2></Link>
					<Link to="/audio/"><h2>audio programming</h2></Link>
					<Link to="/contact/"><h2>contact</h2></Link>
				</div>
			</div>
		)
	}
}

export default Header