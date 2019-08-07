import React, { Component } from 'react';
import AudioPlayhead from './AudioPlayhead';

class AudioAnalyser extends Component {
	constructor(props) {
		super(props);
		this.state = { audioData: new Uint8Array(0) };
		this.tick = this.tick.bind(this);
	}

	componentDidMount() {

		console.log('analyser loaded');
		// audio analyser
		this.analyser = this.props.context.createAnalyser();
		this.analyser.fftSize = 512;
		console.log("fftsize - 512 " + this.analyser.fftSize);
		this.bufferLength = this.analyser.frequencyBinCount;
		console.log("bufferLength = " + this.bufferLength);
		this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
		console.log("dataArray length 256 = " + this.dataArray.length);
		this.analyser.getByteTimeDomainData(this.dataArray);
		// this.canvas = document.getElementById('visualizer');
		// this.canvasCtx = this.canvas.getContext('2d');
		this.props.source.connect(this.analyser);
		console.log(this.props.source);
		this.rafId = requestAnimationFrame(this.tick);
	}

	tick() {
		this.analyser.getByteTimeDomainData(this.dataArray);
		this.setState({ audioData: this.dataArray });
		this.rafId = requestAnimationFrame(this.tick);
	}


	draw() {
		const canvas = this.canvas.current;
		const height = canvas.height;
		const width = canvas.width;
		const context = canvas.getContext('2d');
		let x = 0;
		const sliceWidth = (width + 1.0)/ this.state.audioData.length;
		context.lineWidth = 5;
		context.strokeStyle = '#000000';
		context.clearRect(0,0,width,height);
		context.beginPath();
		context.moveTo(0,height/2);
		for (const item of this.state.audioData) {
			const y = (item / 255.0) * height;
			context.lineTo(x,y);
			x += sliceWidth;
		}
		context.lineTo(x, height/2);
		context.stroke();
	}

	componentWillUnmount() {
		cancelAnimationFrame(this.rafId);
		this.analyser.disconnect();
	}

	render() {
		return <AudioPlayhead />;
	}

}

export default AudioAnalyser;