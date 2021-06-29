import React, { Component } from 'react'
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Alertmsg from './MasErorr ';

export class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: '',
      data: {},
      display: false,
      error: '',
      alert: false,
      weatherData: []
    }
  }
  nameHandler = (e) => {
    this.setState({
      cityName: e.target.value,
    });
  }
  submitData = async (e) => {
    e.preventDefault();
    try {
      const axiosResponse = await axios.get(`https://us1.locationiq.com/v1/search.php?key=pk.88bdc34a015f169659efd4fa8583736c&q=${this.state.cityName}&format=json`)
      const axiosRes = await axios.get(`${process.env.REACT_APP_URL}/weather`);
      this.setState({
        data: axiosResponse.data[0],
        display: true,
        alert:false
      })
    } catch (error) {
      this.setState({
        errot: error.message,
        alert: true,
        display:false,
        weatherData: axiosRes.data
      })
    }
  }
  render() {
    return (
      <div>
        <MasErorr 
          alert={this.state.alert}
        />

        <Form onSubmit={this.submitData}>
          <Form.Group className="mb-3" controlId="formBasicEmail" 	 >
            <Form.Label>City Name</Form.Label>
            <Form.Control type="text" placeholder="Enter City Name" onChange={this.nameHandler} />
          </Form.Group>
          <Button variant="primary" type="submit" >
            Explore!
          </Button>
        </Form>
        {this.state.display &&
          <div>
            <p>
              {this.state.data.display_name}
            </p>
            <Image src={`https://maps.locationiq.com/v3/staticmap?key=pk.88bdc34a015f169659efd4fa8583736c&center=${this.state.data.lat},${this.state.data.lon}&zoom=10`} rounded/>
            <p>
              {`lat: ${this.state.data.lat}, lon: ${this.state.data.lon}`}
            </p>
          </div>
        }
      </div>
    )
  }
}
export default Forms;
