import React from 'react'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import {connect} from 'react-redux'



const mapStyles = {
    width: '70%',
    height: '70%',
    margin: 'auto',
}

class MapContainer extends React.Component{

    state={
        showingInfoWindow: false,
        activeMarker:{},
        selectedPlace: {}
    }

    onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }; 

  renderMap = () => {
    if (this.props.post.lat) {
      return  <Map
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={{
                lat: this.props.post.lat,
                lng: this.props.post.lng
                }}
            >
            <Marker
                onClick={this.onMarkerClick}
                name={this.props.post.title}
            />
            <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onClose={this.onClose}
            >
                <div>
                    <h4>{this.state.selectedPlace.name}</h4>
                </div>
            </InfoWindow>
      </Map>
    } else {
      return <h4>LOADING</h4>
    }
  }

    render(){
        return <div>
          {this.renderMap()}
        </div>
    }
  }

  const mapStateToProps =state=>{
    return{
      key: state.google
    }
  } 
export default connect(mapStateToProps)(GoogleApiWrapper(props => {return{apiKey: props.googleKey}})(MapContainer))