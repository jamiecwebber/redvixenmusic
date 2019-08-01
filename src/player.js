
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons'
import './player.scss'
import eclair from './audio/eclairdelune.wav'

class Player extends Component {
	constructor() {
		super();
		this.state = {
			selectedTrack: "Éclair de lune",
			player: "stopped"
		}
		
	}


	componentDidMount() {
		this.player.src = eclair;
		this.player.addEventListener("timeupdate", e => {
			this.setState({
				currentTime: e.target.currentTime,
				duration: e.target.duration
			});
		});
	}

	componentWillUnmount() {
		this.player.removeEventListener("timeupdate", ()=> {});
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
			} else if (
				this.state.player === 'playing' &&
				prevState.player === 'paused' || prevState.player === 'stopped'
			) {
				this.player.play();
			}
		}
	}

	render() {
		const list = [{id: 1, title: 'Éclair de lune'}].map(item => {
			return (
				<h1
					className="song-title"
					key={item.id}
					onClick={() => this.setState({ selectedTrack: item.title})}
				>
				{item.title}
				</h1>
			);
		});


		function getTime(time) {
			if(!isNaN(time)) {
				return Math.floor(time/60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
			}
		}

		const currentTime = getTime(this.state.currentTime);
		const duration = getTime(this.state.duration);

		return (
			<div className="player">
				<div className='player-controls'>
					{list}
					{this.state.player === 'playing' || this.state.player === 'paused' ? (
						<div className='playback-time'>
							{currentTime} / {duration}
						</div>
					) : (
						<div className='playback-time'>
							
						</div>
					)}
					<div className='controls-row1'>
						{this.state.player === 'paused' || this.state.player === 'stopped' ? (
							<button className='start-pause' onClick={()=> this.setState({ player: "playing" })}>
								<FontAwesomeIcon icon={faPlay} />
							</button>
						) : (
							<button className='start-pause' onClick={()=> this.setState({ player: "paused" })}>
								<FontAwesomeIcon icon={faPause} />
							</button>
						)}
					</div>
					<div className='controls-row2'>
						<button className='forward-back'>
							<FontAwesomeIcon icon={faBackward}/>
						</button>
						<button className='stop' onClick={() => this.setState({ player: 'stopped' })}>
							<FontAwesomeIcon icon={faStop} />
						</button>
						<button className='forward-back'>
							<FontAwesomeIcon icon={faForward}/>
						</button>
					</div>
				</div>
				<audio ref={ref => this.player = ref} />
			</div>
		);
	}
}

export default Player