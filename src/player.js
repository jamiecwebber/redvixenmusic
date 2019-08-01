
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons'
import './player.scss'
import eclair from './audio/eclairdelune.wav'

class Player extends Component {
	constructor() {
		super();
		this.state = {
			selectedTrack: null,
			player: "stopped"
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.selectedTrack !== prevState.selectedTrack) {
			let track;
			switch(this.state.selectedTrack){
				case "Éclair de lune":
					track = eclair
				break;
				default:
				break;
			}
			if(track) {
				this.player.src = track;
				this.player.play();
				this.setState({player: 'playing'});
			}
		}
		if (this.state.player !== prevState.player) {
			if (this.state.player === 'paused') {
				this.player.pause();
			} else if (this.state.player === 'stopped') {
				this.player.pause();
				this.player.currentTime = 0;
				this.setState({selectedTrack: null });
			} else if (
				this.state.player === 'playing' &&
				prevState.player === 'paused'
			) {
				this.player.play();
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
				<ul>{list}</ul>
				<div className='player-controls'>
					<div className='controls-row1'>
						{this.state.player === 'paused' && (
							<button className='start-pause' onClick={()=> this.setState({ player: "playing" })}>
								<FontAwesomeIcon icon={faPlay} />
							</button>
						)}
						{this.state.player === 'playing' && (
							<button className='start-pause' onClick={()=> this.setState({ player: "paused" })}>
								<FontAwesomeIcon icon={faPause} />
							</button>
						)}
					</div>
					<div className='controls-row2'>
						{this.state.player === 'playing' || this.state.player === 'paused' ? (
							<button className='stop' onClick={() => this.setState({ player: 'stopped' })}>
								<FontAwesomeIcon icon={faStop} />
							</button>
						) : ( "" )}
					</div>
				</div>
				<audio ref={ref => this.player = ref} />
			</div>
		);
	}
}

export default Player