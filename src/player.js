import React, { Component } from 'react';
import './player.scss'
import eclair from './audio/eclairdelune.wav'

class Player extends Component {
	constructor() {
		super();
		this.state = {
			selectedTrack: null
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if(this.state.selectedTrack !== prevState.selectedTrack) {
			console.log("play");
			let track;
			switch(this.state.selectedTrack){
				case "Éclair de lune":
					track = eclair
				break;
				default:
				break;
			}
			console.log(eclair);
			console.log(track);
			if(track) {
				console.log(track);
				this.player.src = track;
				this.player.play()
			}
		}
	}

	render() {
		const list = [{id: 1, title: 'Éclair de lune'}].map(item => {
			return (
				<li
					key={item.id}
					onClick={() => this.setState({ selectedTrack: item.title})}
				>
				{item.title}
				</li>
			);
		});

		return (
			<div className="player">
				<h1>This is the player</h1>
				<ul>{list}</ul>
				<audio ref={ref => this.player = ref} />
			</div>
		);
	}
}

export default Player