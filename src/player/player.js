
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons'
import './player.scss'
import AudioAnalyser from './AudioAnalyser'
import eclair from '../audio/eclairdelune.wav'
import duet from '../audio/duet.mp3'


class Player extends Component {
	constructor() {
		super();
		this.state = {
			selectedTrack: "Éclair de lune",
			player: "stopped",
			audioData: new Uint8Array(0),
			audioBufferSource: null,
			waveformArray: [],
			fullWave: [],
			arrayMax: 1,
			currentTime: 0,
			duration: null,
			startedAt: null,
			pausedAt: null,
		}
		this.full = React.createRef();
		this.tick = this.tick.bind(this.tick);
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

	chunk(arr, len) {
		var chunks = [];
		var i = 0;
		var n = arr.length;
		while (i < n) {
			chunks.push(arr.slice(i, i += len));
		}
		return chunks;
	}

	getWave(buffer, n=1) {
		// should reduce the full buffer to a more sensible size for visualization
		// n is how much it downsamples by - by default downsamples by 10.
		let waveformArray
		if (n != 1) {
			waveformArray = this.chunk(buffer, n).map(s => this.getMax(s));
		} else waveformArray = buffer;
		this.arrayMax = this.getMax(waveformArray);
		waveformArray = waveformArray.map(sample => sample/this.arrayMax);
		this.setState({ waveformArray: waveformArray })
		
	}

	drawWave(startIndex) {
		const canvas = this.full.current;

		let dpi = window.devicePixelRatio;
		console.log("dpi = " + dpi)

		const context = canvas.getContext('2d');

		const height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2) * dpi;
		const width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2) * dpi;

		canvas.setAttribute('height', height);
		canvas.setAttribute('width', width);

		let x = 0;

		// down-sample the full audio and line up the start index
		let grain = 40;

		let waveformRange = 800;
		let pixelWidth = (width*grain + 2*waveformRange/grain) / this.state.waveformArray.length;
		startIndex = startIndex / grain;

		
		let drawArray = this.chunk(this.state.waveformArray, grain)
		drawArray = drawArray.map(i => i[0]);
		
		context.lineWidth = 1;
		context.strokeStyle = 'rgba(0,0,0,1);'
		context.fillStyle = 'rgba(0,0,0,1);'
		
		context.clearRect(0,0,width,height);
		
		context.beginPath();
		context.moveTo(0,height/2);

		// handle beginning and end of file
		if (startIndex < (waveformRange/grain)) startIndex = Math.floor(waveformRange/grain);
		if (drawArray.length - startIndex < (waveformRange/grain)) startIndex = drawArray.length - Math.floor(waveformRange/grain);
		
		let yStretchFactor = 30;
		let xStretchFactor = 3;
		pixelWidth = (width)/(drawArray.length + yStretchFactor*(waveformRange/grain));
		for (const item of drawArray.slice(0, (startIndex)-(waveformRange/grain))){
			x += pixelWidth;
			const y = (item*height + height)/2;
			context.lineTo(x,y)
		}
		let count = 0;
		for (const item of this.state.waveformArray.slice((startIndex*grain)-waveformRange,(startIndex*grain)+waveformRange)) {
			x += pixelWidth + (yStretchFactor*pixelWidth)*(1-(Math.abs(count-waveformRange))/waveformRange);
			const y = (Math.tanh(item + xStretchFactor*item*(1-(Math.abs(count-waveformRange))/waveformRange))*height + height)/2;
			context.lineTo(x,y);
			count += 1;
		}
		for (const item of drawArray.slice(startIndex+(waveformRange/grain), drawArray.length)){
			x += pixelWidth;
			const y = (item*height + height)/2;
			context.lineTo(x,y)
		}
		context.lineTo(x, height/2);
		console.log(width);
		console.log('before stroke');
		context.stroke();
	}

	componentDidMount() {

		// event listeners for debugging
		window.onload = () => {
			console.log('window onload');
		}
		
		// audio analyser
		this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
		
		// creating fetch request to get audio data
		this.getAudioData(duet)
			.then(bufferSource => {
				return this.decodeBuffer(bufferSource);
			})
			.then(() => {
				this.setState({ 
					arrayMax: this.getMax(this.bufferSource.buffer.getChannelData(0)),
					duration: this.bufferSource.buffer.duration,
					fullWave: this.bufferSource.buffer.getChannelData(0)
				});
				this.getWave(this.bufferSource.buffer.getChannelData(0), 1);
				this.drawWave(0);
				
				this.bufferSource.connect(this.audioContext.destination);
			})

	}

	tick = () => {
		let offset = this.audioContext.currentTime - this.state.startedAt
		this.setState({ 
			currentTime: this.getTime(offset)});
		const startIndex = Math.floor(offset/this.state.duration * this.state.fullWave.length)
		this.drawWave(startIndex)
		//console.log(Math.max(...this.state.audioData))
		if (offset > this.state.duration) {
			this.setState({player: 'stopped'})
		}
		else {
			this.rafId = requestAnimationFrame(this.tick);
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
				//this.player.src = track;
				//this.player.play();
				this.setState({player: 'playing'});
			}
		}
		if (this.state.player === 'playing ' &&
			this.audioContext.currentTime > (this.state.startedAt + this.state.duration)){
			this.setState({player: 'stopped'});
		} 
		if (this.state.player !== prevState.player) {
			// console.log(this.state.player);
			if (this.state.player === 'paused') {
				//this.player.pause();
				cancelAnimationFrame(this.rafId);
				let elapsed = this.audioContext.currentTime - this.state.startedAt;
				this.bufferSource.stop();

				this.bufferSource = this.audioContext.createBufferSource();
				this.bufferSource.buffer = this.state.audioBufferSource;
				this.bufferSource.connect(this.audioContext.destination);
				console.log(elapsed);
				this.setState({pausedAt: elapsed});

			} else if (this.state.player === 'stopped') {
				if (prevState.player === 'playing') {
					cancelAnimationFrame(this.rafId);
					this.bufferSource.stop();
					this.setState({currentTime:0});

					console.log(this.state.audioBufferSource);

					this.bufferSource = this.audioContext.createBufferSource();
					this.bufferSource.buffer = this.state.audioBufferSource;
					this.bufferSource.connect(this.audioContext.destination);
				}
				this.setState({pausedAt: null})
				
				//this.player.pause();
				this.state.currentTime = 0;
			} else if (
				this.state.player === 'playing' &&
				(prevState.player === 'paused' || prevState.player === 'stopped')
			) {
				let offset = this.state.pausedAt ? this.state.pausedAt : 0;
				this.bufferSource.start(this.audioContext.currentTime , offset);
				this.setState({startedAt: this.audioContext.currentTime - offset})
				this.rafId = requestAnimationFrame(this.tick);
				//this.player.play();
			}
		}

		// this.draw();
	}


	getTime = (time) => {
		if(!isNaN(time)) {
			return Math.floor(time/60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
		}
	}

	componentWillUnmount() {
		//this.player.removeEventListener("timeupdate", ()=> {});
		cancelAnimationFrame(this.rafId);
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



		const currentTime = this.state.currentTime;
		const duration = this.getTime(this.state.duration);

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
					<canvas style={{height:'100%', width:'100%'}} ref={this.full}/>
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