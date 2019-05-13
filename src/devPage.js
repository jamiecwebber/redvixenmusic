import React, { Component } from 'react';

const DevPage = () => {
	return (
		<div>
			<h2>Web Development</h2>
			<br/>
			<p>I'm a graduate of <b><a href="https://www.lewagon.com/">Le Wagon Full-Stack Web Development Bootcamp</a></b>. This website was built in React.js with a Python Flask backend. I have experience with Ruby on Rails, JavaScript, HTML5/CSS, as well as a familiarity with the Google Cloud Platform and AWS.</p>
			<div className='project'>
				<div className='dev-project-container'>
					<h1>Asyla: Solutions for Refugees and Refugee Resettlement Agencies</h1>
					<div className='project-description'>
						<p>A common experience of refugees arriving in Canada is a lack of coherence in the services offered by resettlement agencies, and these agencies often struggle to keep up with the many facets of receiving a newcomer into our society. Asyla was built to respond to this need. Through a mobile application, the refugee can track their progress on a number of goals, consult a calendar of upcoming appointments, have access to reference images of important documents, and directly contact their resettlement agent if a problem arises. An employee of the resettlement agency can access a full-screen view where she can manage several clients, respond to their queries and see the important tasks in a single unified view.</p>
						<p>My contributions to the project included programming the interactive calendar and task manager, developing the back-end code for accessing filtered lists of tasks, and displaying these with drop-down information panels in the client-side application.</p>
						<a href='http://www.asyla.ca' target='blank'><h2>Visit the site here</h2></a>
						<a href='https://github.com/jamiecwebber/asyla' target='blank'><h3>or check out the GitHub repo</h3></a>
						<br/>
						<p><b>For the agent-side view, log in with username: "admin@asyla.ca" and pass: "lewagon".<br/>
						For the client view, log in as "f.al_hashish@yahoo.fr" for both username and pass.</b></p>
						<p><b>Navigate back to March to see some scheduled events.</b><br/>Apologies for the bugs, this was a two-week final project!</p>
					</div>
				</div>
			</div>
			<div className='project'>
				<div className='dev-project-container'>
					<h1>Come Live With Us</h1>
					<div className='project-description'>
						<p>A Ruby on Rails clone of AirBnB, but with a focus on hosts rather than apartments. Built during Le Wagon coding bootcamp.</p>
						<a href='https://airbnbclone210.herokuapp.com' target='blank'><h2>Visit the site here</h2></a>
						<a href='https://github.com/jamiecwebber/airbnbclone' target='blank'><h3>or check out the GitHub repo</h3></a>
						<p><b>You can login as user: 'lilly@email.com', pass: 'lewagon'</b></p>
					</div>
				</div>
			</div>
			<div className='project'>
				<div className='dev-project-container'>
					<div className='project-description'>
						<h1>Freelance Google Chrome Extension</h1>
						<p>I can't say too much, but I was commissioned to make a Chrome extension that scrapes webpages for specific links and processed their text content with the Google Cloud AutoML API. Seeing as this API is still a beta product and Chrome Extensions are not very powerful, communicating between the two proved difficult. I found that I needed to make a serverless web relay function to pass information between the extension and the Machine Learning algorithm.</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DevPage;