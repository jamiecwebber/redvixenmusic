import React, { Component } from 'react';
import styles from './player.scss';


const playheadStyle = {
	border: '1px solid green',
	width: '10vh',
	height: '10vh'
}

class AudioPlayhead extends Component {
	constructor(props) {
		super(props);
		this.canvas = React.createRef();
	}


	draw() {
		const { audioData } = this.props;
		const canvas = this.canvas.current;
		const height = canvas.height;
		const width = canvas.width;
		const context = canvas.getContext('2d');
		let x = 0;
		const sliceWidth = (width + 1.0)/ audioData.length;
		context.lineWidth = 5;
		context.strokeStyle = '#000000';
		context.clearRect(0,0,width,height);
		context.beginPath();
		context.moveTo(0,height/2);
		for (const item of audioData) {
			const y = (item / 255.0) * height;
			context.lineTo(x,y);
			x += sliceWidth;
		}
		context.lineTo(x, height/2);
		context.stroke();
	}

	componentDidUpdate() {
		this.draw();
	}

	render() {
		return <canvas style={playheadStyle} ref={this.canvas} />;
	}
}

export default AudioPlayhead;