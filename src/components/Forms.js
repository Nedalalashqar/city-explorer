import React, { Component } from 'react'
import axios from 'axios';
import {Form , Button,Image} from 'react-bootstrap'
import MasErorr  from './MasErorr ';

export class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      data: {},
      show: false,
      error: '',
      alert: false,
      weatherData: []
    }
  }
  nameHandler = (e) => {
    this.setState({
      city: e.target.value,
    });
  }
  submitData = async (e) => {
    e.preventDefault();
    try {
      const axiosResponse = await axios.get(`https://us1.locationiq.com/v1/search.php?key=pk.88bdc34a015f169659efd4fa8583736c&q=${this.state.city}&format=json`)
      const axiosRes = await axios.get(`${process.env.REACT_APP_URL}/weather`);
      this.setState({
        data: axiosResponse.data[0],
        show: true,
        alert:false
      })
    } catch (error) {
      this.setState({
        errot: error.message,
        alert: true,
        show:false,
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
          <Form.Group className="mb-3">
            <Form.Label>City Name</Form.Label>
            <Form.Control type="text" placeholder="City Name" onChange={this.nameHandler} />
          </Form.Group>
          <Button variant="primary" type="submit" >
            Explore!
          </Button>
        </Form>
        {this.state.show &&
          <div>
            <p>
              {this.state.data.display_name}
            </p>
            <Image src={`https://maps.locationiq.com/v3/staticmap?key=pk.88bdc34a015f169659efd4fa8583736c&center=${this.state.data.lat},${this.state.data.lon}&zoom=14`}/>
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
