import React, { Component } from "react"
import "./MapHike.css";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Row, Col, Input, Button, Card, CardTitle } from 'react-materialize'
import { API, USER } from "../../utils";
import SaveButton from "../SaveButton"
import DeleteButton from "../DeleteButton"

export class MapContainer extends Component {
  state = {
    results: [],
    userAc: [],
    isLoggedIn: sessionStorage.isLoggedIn,
    userId: sessionStorage.userId,
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    lat: "",
    lng: "",
    position: null,
    addressNum: "",
    city: "",
    state: "",
    hike: 'http://pluspng.com/img-png/png-hiking-camping-1000.png'
  }



  startHike = () => {

    var secondsLabel = document.getElementById("time");
    var totalSeconds = 0;
    setInterval(setTime, 1000);

    function setTime() {
      ++totalSeconds;
      secondsLabel.innerHTML = pad(totalSeconds % 60);
    }

    function pad(val) {
      var valString = val + "";
      if (valString.length < 2) {
        return "0" + valString;
      } else {
        return valString;
      }
    }
  }



  endHike = () => {
  }

componentWillMount(){
  this.showCurrentPos()
}
  componentDidMount() {
    this.showDistance()
    this.willHike()
  }
  loadUser = (id) => {
    USER.getUser(id)
      .then(res => this.setState({ userAc: res.data })
      )
      .catch(err => console.log(err));
  };
  showCurrentPos = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat
      let lng

      lat = position.coords.latitude
      lng = position.coords.longitude

      this.setState({ lat: lat, lng: lng })
      // this.searchTrails(this.state.lat, this.state.lng)
      console.log(this.state.lat)
      console.log(this.state.lng)
    })
  }

  showDistance = () => {
    Number.prototype.toRad = function () {
      return this * Math.PI / 180;
    }
    var lat2 = 33.9148239;
    var lon2 = -118.01347389999998;
    var lat1 = 33.684567;
    var lon1 = -117.826505;

    var R = 6371; // km 
    //has a problem with the .toRad() method below.
    var x1 = lat2 - lat1;
    var dLat = x1.toRad();
    var x2 = lon2 - lon1;
    var dLon = x2.toRad();
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    console.log(d)
  }
  onInfoWindowClose = () => {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    })
  }
  mapClicked = (mapProps, map, event) => {
    //this.setState({
    //   lat: event.latLng.lat(), lng: event.latLng.lng()
    //})
    // alert(event.latLng.lat() + '/' + event.latLng.lng())

  }
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  willHike =()=> {
  alert("Start your Hike?")
  }
  render() {
    const style = {
      width: '100%',
      height: '100vh'
    }
    var points = [
      { lat: this.state.lat, lng: this.state.lng },
      { lat: 33.684567, lng: -117.826505 },

    ]

    return (
      <Row >
        <Col s={12} >

          <Map style={style}
            google={this.props.google}
            mapTypeId={this.satellite}
            zoom={10}
            onClick={this.mapClicked}
            //centerAroundCurrentLocation={false}
            center={{ lat: this.state.lat, lng: this.state.lng }}>

            <Marker
              onClick={this.onMarkerClick}
              name={'Your current location'}
              position={{ lat: this.state.lat, lng: this.state.lng }} />
            <Marker
              // onClick={this.onMarkerClick}
              name={'Current Hike'}
              position={{ lat: 33.684567, lng: -117.826505 }}
              icon={{ hike: 'http://pluspng.com/img-png/png-hiking-camping-1000.png' }} />
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}>

            </InfoWindow>
          </Map>
          {/* <Row id="pos">
            <Button className='red' waves='light' id='start' onClick={() => this.startHike()}>Start Hike</Button>
          </Row>
          <Row id="pos">
            <Button className='red' waves='light' id='end' onClick={() => this.endHike()} >End Hike</Button>
          </Row>
          <Row id="pos">
            <h6>Distance Traveled: </h6><h6 id='distance'></h6>
            <h6>Time: </h6><h6 id='time'></h6>
          </Row> */}
        </Col>
      </Row>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCmdV4DIx0uYZXFlVfbsqx12rfNM_dYz7A'
})(MapContainer)