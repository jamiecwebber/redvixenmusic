import React from 'react';
import './player.css'

const Player = () => {
	return (
		<div className="player">
			<iframe title="soundcloud" width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/490888653&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
		</div>
	)
}

export default Player