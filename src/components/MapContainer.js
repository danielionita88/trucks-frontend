import React from 'react'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import Geocode from 'react-geocode'


const mapStyles = {
    
    width: '40%',
    height: '40%',
    left:150,
    top:150,
}

export class MapContainer extends React.Component{

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

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }; 

    render(){console.log(this.props)
        return <div>
            <Map
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
                name={'Kenyatta International Convention Centre'}
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
        </div>
    }
}
const key = "AIzaSyBdcUzOoj5uRW41DAZvPZnhbSmfAsarkw0"
export default GoogleApiWrapper({apiKey:key})(MapContainer)