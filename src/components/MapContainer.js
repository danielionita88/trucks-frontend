import React from 'react'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import {connect} from 'react-redux'



const mapStyles = {
    
    width: '40%',
    height: '40%',
    left:150,
    top:150,
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
        </div>
    }
  }

  const mapStateToProps =state=>{
    return{
      key: state.google
    }
  } 
export default connect(mapStateToProps)(GoogleApiWrapper(props => {return{apiKey: props.googleKey}})(MapContainer))