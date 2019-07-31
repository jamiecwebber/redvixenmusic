import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import axios from 'axios';
import './form.scss';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
    }
    this.handleChange = this.handleChange.bind(this);
    this.addSound = this.addSound.bind(this);
  }

  addSound(event) {
    event.preventDefault();
    console.log(event);
    const data = new FormData();
    data.append('title', this.state.title);
    data.append('file', this.uploadInput.files[0]);
    console.log(process.env.REACT_APP_USERS_SERVICE_URL)
    axios.post(`${process.env.REACT_APP_USERS_SERVICE_URL}/sounds`, data)
    .then((res) => { 
      console.log(res);
    })
    .catch((err) => { console.log(err); });
  }

  handleChange(event) {
    const obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  }

  render () {
    return(
      <div className="form">
        <form onSubmit={this.addSound} encType="multipart/form-data">
          <div className="field">
            <input
              name="title" 
              className="input"
              type="text" 
              placeholder="Enter a title" 
              required
              value = {this.state.title} 
              onChange = {this.handleChange}/>
          </div>
          <div className="field">
            <input
              type="file"
              ref={(ref) => { this.uploadInput = ref; }}
              name="file"
              accept="audio/*"/>
          </div>
          <input
            type="submit" className="button"
            value="Submit" />
        </form>
      </div>
    )
  }
}

export default Form;