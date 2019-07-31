import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Link } from "react-router-dom";
import TitleCard from './titleCard'
import Header from './header'
import DevPage from './devPage'
import SoundsPage from './soundsPage'
import AudioPage from './audioPage'
import ContactPage from './contactPage'

function Index() {
	return (
		<div>
			<TitleCard />
		</div>
	);
}

function Dev() {
	return (
		<div className='pageContent'>
			<DevPage />
		</div>
	);
}

function Music() {
	return (
		<div className='pageContent'>
			<SoundsPage />
		</div>
	);
}

function Audio() {
	return (
		<div className='pageContent'>
			<AudioPage />
		</div>
	);
}

function Contact() {
	return (
		<div className='pageContent'>
			<ContactPage />
		</div>
	);
}

function AppRouter() {
	return (
		<Router>
			<div>
				<Header />
        		<div className="bodyContainer">	
					<Route exact path='/' render={()=> <Redirect to='/redvixenmusic'/>}/>
					<Route path="/redvixenmusic" component={Index} />
					<Route path="/dev" component={Dev} />
					<Route path="/music" component={Music} />
					<Route path="/audio" component={Audio} />
					<Route path="/contact" component={Contact} />
				</div>
			</div>
		</Router>
	);
}

export default AppRouter;

