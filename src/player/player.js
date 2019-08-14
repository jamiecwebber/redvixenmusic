
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons'
import './player.scss'
import AudioAnalyser from './AudioAnalyser'
import eclair from '../audio/eclairdelune.wav'
import duet from '../audio/duet.mp3'


// user26 !!!

class Player extends Component {
	constructor() {
		super();
		this.state = {
			selectedTrack: "Éclair de lune",
			player: "stopped",
			audioData: new Uint8Array(0),
			audioBufferSource: null,
			waveformArray: [],
			arrayMax: 1
		}
		this.full = React.createRef();
		// this.full = React.createRef();
	}

	getAudioData(url) {

		return fetch(url)
		.then((response) => {
			if (!response.ok) {
				throw new Error("HTTP error, status = " + response.status);
			}
			this.setState({audioBufferSource: response.clone().arrayBuffer()})
			return response.arrayBuffer();
		})	
	}

	decodeBuffer(bufferSource) {
		{
			
			this.bufferSource = this.audioContext.createBufferSource();
			return this.audioContext.decodeAudioData(bufferSource, (decodedData) => {
				console.log(decodedData);
				this.setState({audioBufferSource : decodedData});
				console.log(this.state.audioBufferSource);
				this.bufferSource.buffer = this.state.audioBufferSource;
			})
		}
	}

	getMax(buffer) {

		var max = buffer.reduce((a,b) => {
			const c = Math.max(Math.abs(a), Math.abs(b));
			return (c === Math.abs(a)) ? a : b;
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

	getWave(buffer, n=10) {
		// should reduce the full buffer to a more sensible size for visualization
		// n is how much it downsamples by - by default downsamples by 10.
		let waveformArray
		if (n != 1) {
			waveformArray = this.chunk(buffer, n).map(s => this.getMax(s));
		} else waveformArray = buffer;
		waveformArray = waveformArray.map(sample => sample/this.state.arrayMax);
		this.setState({ waveformArray: waveformArray })
		console.log(this.state.waveformArray.length);

		// Draw the waveform

		// TODO: adapt to changing screen size... don't recalculate array every time.
	}

	drawWave() {
		const canvas = this.full.current;

		let dpi = window.devicePixelRatio;
		console.log("dpi = " + dpi)

		const context = canvas.getContext('2d');

		const height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2) * dpi;
		const width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2) * dpi;

		canvas.setAttribute('height', height);
		canvas.setAttribute('width', width);


		let x = 0;
		//
		let grain = 5;
		let pixelWidth = (width * grain) / this.state.waveformArray.length  ;
		console.log("pixelWidth = " + pixelWidth);
		
		let drawArray = this.chunk(this.state.waveformArray, grain)
		drawArray = drawArray.map(i => this.getMax(i));
		console.log(drawArray.length)
		console.log('AFTER draw array map')
		context.lineWidth = 1;
		context.strokeStyle = 'rgba(0,0,0,1);'
		context.fillStyle = 'rgba(0,0,0,1);'
		console.log('before clearrect');
		context.clearRect(0,0,width,height);
		console.log('after clearrect');
		context.beginPath();
		context.moveTo(0,height/2);
		let startIndex = 40000;
		let waveformRange = 2000;
		pixelWidth = width/waveformRange;
		let count = 0;
		for (const item of drawArray.slice(startIndex-waveformRange,startIndex+waveformRange)) {

			const y = (Math.tanh(item*4)*height + height)/2;
			context.lineTo(x,y);
			x += (pixelWidth)*(1-(Math.abs(count-waveformRange))/waveformRange);
			
			count += 1;
		}
		context.lineTo(x, height/2);
		console.log(width);
		console.log('before stroke');
		context.stroke();
	}

	componentDidMount() {
		//this.player.src = duet;
		// timing needs to change with change to web api
		//this.player.addEventListener("timeupdate", e => {
		//	this.setState({
		//		currentTime: e.target.currentTime,
		//		duration: e.target.duration
		//	});
		//});

		// event listeners for debugging
		window.onload = () => {
			console.log('window onload');
		}
		// this.player.oncanplay = () => {
		// 	console.log('canplay');
		// }
		// this.player.onloadstart = () => {
		// 	console.log('loadstart');
		// }
		// this.player.ondurationchange = () => {
		// 	console.log('durationchange');
		// }
		// this.player.onloadedmetadata = () => {
		// 	console.log('onloadedmetadata');
		// }
		// this.player.oncanplaythrough = () => {
		// 	console.log('canplaythrough');
		// }
		// audio analyser
		this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
		
		// this.canvas = document.getElementById('visualizer');
		// this.canvasCtx = this.canvas.getContext('2d');
		//console.log(this.player);

		// creating fetch request to get audio data
		this.getAudioData(duet)
			.then(bufferSource => {
				return this.decodeBuffer(bufferSource);
			})
			.then(() => {
				console.log(this.bufferSource.buffer);
				//this.bufferSource.start(0);
				//this.state.player = 'playing';
				this.setState({ arrayMax: this.getMax(this.bufferSource.buffer.getChannelData(0)) });
				this.getWave(this.bufferSource.buffer.getChannelData(0), 1);
				this.drawWave();
				
				
				
				console.log(this.state.arrayMax);
				this.bufferSource.connect(this.audioContext.destination);
				
				
			})

		//this.source = this.audioContext.createMediaElementSource(this.player);
		//console.log(this.source);
		//this.source.connect(this.audioContext.destination);
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
				//this.player.src = track;
				//this.player.play();
				this.setState({player: 'playing'});
			}
		}
		if (this.state.player !== prevState.player) {
			// console.log(this.state.player);
			if (this.state.player === 'paused') {
				//this.player.pause();
			} else if (this.state.player === 'stopped') {
				this.bufferSource.stop();
				console.log(this.state.audioBufferSource);

				this.bufferSource = this.audioContext.createBufferSource();
				this.bufferSource.buffer = this.state.audioBufferSource;
				this.bufferSource.connect(this.audioContext.destination);
				
				//this.player.pause();
				//this.player.currentTime = 0;
			} else if (
				this.state.player === 'playing' &&
				(prevState.player === 'paused' || prevState.player === 'stopped')
			) {
				console.log('play');
				console.log(this.bufferSource);
				this.bufferSource.start(0);
				//this.player.play();
			}
		}
		// this.draw();
	}

	componentWillUnmount() {
		//this.player.removeEventListener("timeupdate", ()=> {});
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
					<canvas style={{border:'2px solid orange', height:'100%', width:'100%'}} ref={this.full}/>
				</div>

				{/*<audio ref={ref => this.player = ref} /> */}
			</div>
		);
	}
}

export default Player

// thanks to
// https://dev.to/ma5ly/lets-make-a-little-audio-player-in-react-p4p
// https://www.twilio.com/blog/audio-visualisation-web-audio-api--react
// https://mdn.github.io/fetch-examples/fetch-array-buffer/
// https://medium.com/wdstack/fixing-html5-2d-canvas-blur-8ebe27db07da