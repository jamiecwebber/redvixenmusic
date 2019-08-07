
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons'
import './player.scss'
import AudioAnalyser from './AudioAnalyser'
import eclair from '../audio/eclairdelune.wav'

class Player extends Component {
	constructor() {
		super();
		this.state = {
			selectedTrack: "Éclair de lune",
			player: "stopped",
			audioData: new Uint8Array(0),
			waveformArray: [],
			arrayMax: 1
		}
		this.canvas = React.createRef();
		// this.full = React.createRef();
	}

	getAudioData(url) {
		this.bufferSource = this.audioContext.createBufferSource();

		return fetch(url)
		.then((response) => {
			if (!response.ok) {
				throw new Error("HTTP error, status = " + response.status);
			}
			console.log(response);
			return response.arrayBuffer();
		})	
	}

	decodeBuffer(bufferSource) {
		{
			return this.audioContext.decodeAudioData(bufferSource, (decodedData) => {
				this.bufferSource.buffer = decodedData;
			})
		}
	}

	getMax(buffer) {
		var max = buffer.reduce((a,b) => {
			return Math.max(a, b);
		})
		return max;
	}

	normalize() {

	}

	chunk(arr, len) {
		var chunks = [];
		var i = 0;
		var n = arr.length;

		while (i < n) {
			chunks.push(arr.slice(i, i += len));
		}

		return chunks;
	}

	drawWave(buffer) {
		// should reduce the full buffer to a more sensible size for visualization
		// reduce to 20 samples per second (just to try)
		const waveformArray = this.chunk(buffer, 2205).map(s => this.getMax(s));
		console.log(waveformArray);

		// TODO: adapt to changing screen size... don't recalculate array every time.
	}

	componentDidMount() {
		this.player.src = eclair;
		this.player.addEventListener("timeupdate", e => {
			this.setState({
				currentTime: e.target.currentTime,
				duration: e.target.duration
			});
		});

		// event listeners for debugging
		window.onload = () => {
			console.log('window onload');
		}
		this.player.oncanplay = () => {
			console.log('canplay');
		}
		this.player.onloadstart = () => {
			console.log('loadstart');
		}
		this.player.ondurationchange = () => {
			console.log('durationchange');
		}
		this.player.onloadedmetadata = () => {
			console.log('onloadedmetadata');
		}
		this.player.oncanplaythrough = () => {
			console.log('canplaythrough');
		}
		// audio analyser
		this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
		
		// this.canvas = document.getElementById('visualizer');
		// this.canvasCtx = this.canvas.getContext('2d');
		console.log(this.player);

		// creating fetch request to get audio data
		this.getAudioData(eclair)
			.then(bufferSource => this.decodeBuffer(bufferSource))
			.then(() => {
				console.log(this.bufferSource.buffer);
				//this.bufferSource.start(0);
				//this.state.player = 'playing';

				this.drawWave(this.bufferSource.buffer.getChannelData(0));
				
				this.setState({ arrayMax: this.getMax(this.bufferSource.buffer.getChannelData(0)) });
				
				console.log(this.state.arrayMax);
				this.bufferSource.connect(this.audioContext.destination);
				
			})

		this.source = this.audioContext.createMediaElementSource(this.player);
		console.log(this.source);
		this.source.connect(this.audioContext.destination);
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
				(prevState.player === 'paused' || prevState.player === 'stopped')
			) {
				console.log('play');
				this.player.play();
			}
		}
		// this.draw();
	}

	componentWillUnmount() {
		this.player.removeEventListener("timeupdate", ()=> {});
	}

	render() {
		const list = [{id: 1, title: 'Éclair de lune'}].map(item => {
			return (
				<h1
					className="song-title"
					key={item.id}
					onClick={() => this.setState({ selectedTrack: item.title })}
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
					{/* this.state.player === 'playing' && <AudioAnalyser context={this.audioContext} source={this.bufferSource} max={this.state.arrayMax}/> */}
					
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
// https://mdn.github.io/fetch-examples/fetch-array-buffer/