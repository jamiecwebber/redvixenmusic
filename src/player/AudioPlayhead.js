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

	render() {
		return <canvas style={playheadStyle} ref={this.canvas} />;
	}
}

export default AudioPlayhead;