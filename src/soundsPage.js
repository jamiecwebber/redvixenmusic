import React, { Component } from 'react';

const SoundsPage = () => {
	return (
		<div>
			<h2>Composition & Improvisation</h2>
			<br/>
			<a href='https://soundcloud.com/jamiechristopherwebber' target='blank'>Visit my SoundCloud page</a>
			<br/>
			<div className="project">
				<div className="project-container">
					<p>My music explores feelings of stasis, music as refuge and sanctuary. My style lends heavily off the style of late Quebecois composer Claude Vivier, in its colours and techniques.</p>
					<p>In technique, I consider myself part of the French tradition following from Messiaen's teachings at the Conservatoire de Paris. Rhythmically I explore a tension between pulsations at the quarter-note and sixteenth-note levels, and harmonically I use a series of spectral calculations to give me music in which any pitch is valid, not just those found on the keyboard of a piano. I believe that microtonality will be for the 21st century what atonality was for the 20th, and I want to be a part of it.</p>
					<p>Currently I am interested in contemporary opera and in the role that artists play as the record-keepers or archivists of any given era. In a real way, by keeping a record of how it feels to live at any moment artists keep a memory of life alive in a way that other mediums cannot. Art is a little snapshot of a moment for the future.</p>
				</div>
			</div>
			<div className="project">
				<div className="project-container">
					<div className="project-description">
						<h1>birdsong fantasia</h1>
						<p><b>for piano and violin, 4:30<br/>
						Written for Ascending Duo, Waterloo, Ontario, Summer 2018</b></p>
						<p>A short and picturesque piece with some tricky rhythms in both parts and where the pitches in the violin part are defined to the hundredth of a semitone. But, it's playable, and with practice it's beautiful. The music was inspired by the backyard where I lived when I was briefly in Waterloo. It's nice to be reminded of the beauty in the world.</p>
						<iframe title="birdsong" width="100%" height="166" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/490888653&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
					</div>
				</div>
			</div>
			<div className="project">
				<div className="project-container">
					<div className="project-description">
						<h1>Sonorités de l'Île Fragrante</h1>
						<p><i>after Alfred Jarry</i></p>
						<p><b>for string quartet, 6:30<br/>
						Written for Bozzini Quartet, Summer 2017</b></p>
						<p>A series of short hallucinations, fleeting moments of lucidity of an otherwise unconscious and inaccessible experience. This piece takes inspiration from the writings of Alfred Jarry, who in his <i>Dr. Faustroll</i> describes a series of voyages to bizarre islands described in florid and elaborate language. Everything is fleeting, and ultimately we are left with a feeling of departure despite having barely even made first acquaintances.</p>
						<iframe title="sonorites" width="100%" height="166" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/343169626&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
					</div>
				</div>
			</div>
			
		</div>
	);
}

export default SoundsPage;