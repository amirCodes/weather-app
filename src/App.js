import React from 'react';
import './App.css';
import axios from "axios";
import Card from 'react-bootstrap/Card'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import ListGroup from 'react-bootstrap/ListGroup'

const city='Kabul';
const apiKey='3902bf8cc145f3f7bc18f1693e075ac0';
const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
const dateTime = new Date().toLocaleString();

const heather={
    margin:'5px',
    paddingBottom: '10px'
}
const body={
    marginLeft: '20%',
    textAlign:'center',
    marginBottom:'150px',
};
const footer={
    paddingBottom:'0px',
    marginBottom:'0px'
};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { weatherInfo: '', main: '',name:'' };
  }
  componentDidMount() {
    axios.get(url)
        .then(response => {
          console.log(response.data)
          this.setState({ weatherInfo: response.data });
        })
        .catch(error => {
          console.log(error);
        });
  }
  render() {
    const { weatherInfo } = this.state;
    const temp = ((weatherInfo || {}).main || {}).temp;
    const humiditys = ((weatherInfo || {}).main || {}).humidity;
    const pressures = ((weatherInfo || {}).main || {}).pressure;
    const windSpeed = ((weatherInfo || {}).wind || {}).speed;
    const windDeg = ((weatherInfo || {}).wind || {}).deg;
    function cloud() {
         let clouds=''
         const cloudInfo = ((weatherInfo || {}).clouds || {}).all;
          if (cloudInfo==0) {
              clouds='clear Sky'
          }if (cloudInfo==1){
              clouds='raining'
         }
          else {
              clouds="cloudy"
          }
         return clouds;
     }

      return (
        <div className="App">
          <header style={heather}>
            <h2>weather forecasts and climatological information for your city</h2>
          </header>
          <body style={body}>
          <div style={body}>
              <Card style={{ width: '25rem' }} className="text-center">
                  <Card.Img variant="top" src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/47897e18605799.577ffd3c2b1ca.gif" />
                  <Card.Body>
                      <Card.Title>Weather in {weatherInfo.name}</Card.Title>
                      <Card.Text>
                          Current weather and forecasts in your city.
                      </Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                      <ListGroupItem>{dateTime}  </ListGroupItem>
                      <ListGroupItem>Wind:Light breeze,{windSpeed} m/s, South ( {windDeg} )</ListGroupItem>
                      <ListGroupItem>Cloudiness:{cloud()} </ListGroupItem>
                      <ListGroupItem>Temperature: {temp}</ListGroupItem>
                      <ListGroupItem>Pressure:{pressures} </ListGroupItem>
                      <ListGroupItem>Humidity:{humiditys} </ListGroupItem>
                  </ListGroup>
                  <Card.Body>
                      <Card.Link href="https://amircodes.github.io/codes">Website</Card.Link>
                      <Card.Link href="https://github.com/amirCodes">GitHub</Card.Link>
                  </Card.Body>
              </Card>
          </div>

          </body>
          <footer style={footer}>
            <p>all right are reserved by the app developer @2019</p>
          </footer>
        </div>
    );
  }
}
export default App;
