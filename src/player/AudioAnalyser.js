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
		this.gain = this.props.context.createGain();
		this.gain.gain.setValueAtTime((1/this.props.max), this.props.context.currentTime);
		this.props.source.connect(this.gain);
		this.gain.connect(this.analyser);
		console.log(this.props.source);
		this.rafId = requestAnimationFrame(this.tick);
	}

	tick() {
		this.analyser.getByteTimeDomainData(this.dataArray);
		this.setState({ audioData: this.dataArray });

		console.log(Math.max(...this.state.audioData))
		this.rafId = requestAnimationFrame(this.tick);
	}



	componentWillUnmount() {
		cancelAnimationFrame(this.rafId);
		this.analyser.disconnect();
	}

	render() {
		return <AudioPlayhead audioData={this.state.audioData} />;
	}

}

export default AudioAnalyser;