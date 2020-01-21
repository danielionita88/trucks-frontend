import React from 'react'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import {connect} from 'react-redux'
import ReactDOM from 'react-dom';
import history from '../history'

const mapStyles = {
    width: '70%',
    height: '70%',
    margin: 'auto',
}

class MapContainer extends React.Component{

    state={
        showingInfoWindow: false,
        activeMarker:{},
        selectedPlace: {},
        clickedPost:''
    }

    onMarkerClick = (props, marker, e) =>{
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true,
        clickedPost:props.post
      });
    }

  onClose = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }; 

  displayMarkers=()=>{
    return this.props.posts.map((post, index)=>{
      return <Marker key={index} position={{
        lat: post.lat,
        lng: post.lng
        }}
        onClick={this.onMarkerClick}
        name={post.title}
        post={post}
      />
    })
  }

  handleInfoWindowClick=()=>{
    history.push(`/used-trucks/${this.state.clickedPost.id}`)
  }

  onInfoWindowOpen=(props, e)=> {
  const button = (<button onClick={this.handleInfoWindowClick}>{this.state.clickedPost.title}</button>);
    ReactDOM.render(React.Children.only(button), document.getElementById("iwc"));
  }

  renderMap = () => {
    if(this.props.posts){
      return  <Map
                google={this.props.google}
                zoom={5}
                style={mapStyles}
                initialCenter={{
                lat: 41.8781,
                lng: -87.6298 
                }}
            >
           {this.displayMarkers()}
            <InfoWindow
                onOpen={e => {this.onInfoWindowOpen(this.props,e)}}
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onClose={this.onClose}
            >
                <div id="iwc">
                </div>
            </InfoWindow>
      </Map>
      
    }
    else if (this.props.post.lat) {
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