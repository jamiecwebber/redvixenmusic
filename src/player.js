
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
			player: "stopped",
			audioData: new Uint8Array(0)
		}
		// this.canvas = React.createRef();
		// this.full = React.createRef();
		this.tick = this.tick.bind(this);
	}



	componentDidMount() {
		this.player.src = eclair;
		this.player.addEventListener("timeupdate", e => {
			this.setState({
				currentTime: e.target.currentTime,
				duration: e.target.duration
			});
		});
		// audio analyser
		this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
		this.analyser = this.audioContext.createAnalyser();
		// this.bufferLength = this.analyser.frequencyBinCount;
		// this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
		// this.analyser.getByteTimeDomainData(this.dataArray);
		// //this.canvas = document.getElementById('visualizer');
		// //this.canvasCtx = this.canvas.getContext('2d');
		// this.source = this.audioContext.createMediaElementSource(this.player);
		// this.source.connect(this.analyser);
		// this.source.connect(this.audioContext.destination);
		// this.rafId = requestAnimationFrame(this.tick);


		// this.player.onloadedmetadata = () => {
		// 	const fullwave = document.getElementById('fullwave');
		// 	const height = fullwave.height;
		// 	const width = fullwave.width;
		// 	const context = fullwave.getContext('2d');
		// 	const sliceWidth = (width)/(this.player.duration / 0.1);
		// 	context.linewitdh = 2;
		// 	context.strokeStyle = '#000000';
		// 	context.clearRect(0,0,width,height);
		// 	context.beginPath();
		// 	let x = 0;
		// 	context.moveTo(x,height/2);

		// 	while (this.player.currentTime < this.player.duration) {
		// 		x += sliceWidth;
		// 		this.player.currentTime += 0.1;
		// 		this.analyser.getByteTimeDomainData(this.dataArray);
		// 		this.setState({ audioData: this.dataArray });
		// 		const y = (this.state.audioData[0] / 255.0) * height;
		// 		context.lineTo(x,y);
		// 	}
		// 	context.lineTo(x, height/2);
		// 	context.stroke();
		// 	this.player.currentTime = 0;

		// }


	}

	tick() {
		this.analyser.getByteTimeDomainData(this.dataArray);
		this.setState({ audioData: this.dataArray });
		this.rafId = requestAnimationFrame(this.tick);
	}

	// draw() {
	// 	const canvas = this.canvas.current;
	// 	const height = canvas.height;
	// 	const width = canvas.width;
	// 	const context = canvas.getContext('2d');
	// 	let x = 0;
	// 	const sliceWidth = (width + 1.0)/ this.state.audioData.length;
	// 	context.lineWidth = 5;
	// 	context.strokeStyle = '#000000';
	// 	context.clearRect(0,0,width,height);
	// 	context.beginPath();
	// 	context.moveTo(0,height/2);
	// 	for (const item of this.state.audioData) {
	// 		const y = (item / 255.0) * height;
	// 		context.lineTo(x,y);
	// 		x += sliceWidth;
	// 	}
	// 	context.lineTo(x, height/2);
	// 	context.stroke();
	// }


	componentWillUnmount() {
		this.player.removeEventListener("timeupdate", ()=> {});
		cancelAnimationFrame(this.rafId);
		this.analyser.disconnect();
		this.source.disconnect();
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
			// console.log(this.state.player);
			if (this.state.player === 'paused') {
				this.player.pause();
			} else if (this.state.player === 'stopped') {
				this.player.pause();
				this.player.currentTime = 0;
			} else if (
				this.state.player === 'playing' &&
				prevState.player === 'paused' || prevState.player === 'stopped'
			) {
				console.log('play');
				this.player.play();
			}
		}
		// this.draw();
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

				<div className='waveform'>
					{/* <canvas id='fullwave' ref={this.full} /> */}
					<canvas id='visualizer' ref={this.canvas} />
				</div>

				<audio ref={ref => this.player = ref} />
			</div>
		);
	}
}

export default Player

// thanks to
// https://dev.to/ma5ly/lets-make-a-little-audio-player-in-react-p4p
// https://www.twilio.com/blog/audio-visualisation-web-audio-api--react