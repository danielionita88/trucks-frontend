import React from 'react'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

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

    render(){
        return <div>
            <Map
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={{
                lat: -1.2884,
                lng: 36.8233
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

export default GoogleApiWrapper({apiKey:"AIzaSyBtVhW1tRL7mWqhJb35r3fsIWGGTm7MaUU"})(MapContainer)