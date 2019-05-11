import React, { Component } from 'react';
import './pages.css';
import midigen from './images/midigen.jpg';
import yanni from './images/yanni.jpg';

const AudioPage = () => {
	return (
		<div>
			<h2>Audio Programming</h2>
			<br/>
			<p>My interest in audio programming mainly focusses on two compositional goals - expanding my resources for composing microtonal music, and exploring the possibility of uisng musical timbre as an compositional parameter. In the future I intend to expand this to include a third - situating the sounds in a space and creating immersive audio experiences.</p>
			<br/>
			<div className='project'>	
				<div className='project-description'>
					<div className='text-block'>
						<div className='title'>
							<h1>MIDIGEN</h1>
							<a href="https://github.com/jamiecwebber/midigen" target='blank'>github</a>
						</div>
						<p>Python library that generates sets of harmonically-related MIDI notes, each paired with a detuning pitchbend message, producing musical material to be manipulated and shaped with a pitch resolution down to the hundredth of a semitone.</p>
					</div>
					<iframe title="midigen" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/610378086&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
				</div>
				<img src={midigen} alt='midigen' />
			</div>

			<div className='project'>	

				<img src={yanni} alt='Glorious Yanni' />
				<div className='project-description'>
					<div className='text-block'>
						<div className='title'>
							<h1 >VAPORYANNI</h1>
							<a href="https://github.com/jamiecwebber/vaporyanni" target='blank'>github</a>
						</div>
						<p>Purposefully ridiculous exploration of audio analysis, segmenting soundfiles into distinct sound-events and using these to generate timbre spaces, multidimensional maps that cluster events according to their timbral similarity.</p> 
						<p>These rearranged fragments are then reassembled into new works that maintains the character of the source materials in some ways and radically distorts it in others.</p>
					</div>
					<iframe title='vaporyanni' height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/610473930&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
				</div>
			</div>

		</div>
	);
}

export default AudioPage;