import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import ReactDOM from 'react-dom';

  export class MapContainer extends Component {
    constructor(props){
      super(props)
    }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
  }
  loadMap() {
    if (this.props && this.props.google) {
      // google is available
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let {initialCenter, zoom} = this.props;
      const {lat, lng} = initialCenter;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      this.map = new maps.Map(node, mapConfig);
    }
    // ...
  }
  
componentDidMount(){
  // const 
}
render() {
  const style = {
    width: '50vw',
    height: '50vh',
    marginLeft: '25%'
  }
    if (!this.props.loaded) {
        return <div ref='map'>Loading...</div>
      }
      return (
        <div style={style} ref='map'>Map will go here
        <Map google={this.props.google}>
          {this.props.locations.map((pos)=>{
          {/* console.log(`MARKERS`, pos) */}
          const marker = new google.maps.Marker({ position : {lat: 40.34122, lng: -73.62123}, 
          map : this.map, 
        title: 'This is Marker',
        icon: { 
        url:'' // put your url hereee
        }
        });
         let mark = {lat: Number(pos.latitude), lng: Number(pos.longitude)}
         console.log(`MARK`, mark)
            return(
            <div>
           <Marker />
          <Marker position={am} />
          </div>
            )
          })}
        </Map> 
          
          
        </div>
      )
    }
 }
 MapContainer.propTypes = {
  google: PropTypes.object,
  zoom: PropTypes.number,
  initialCenter: PropTypes.object,
  locations: PropTypes.array
}
MapContainer.defaultProps = {
  zoom: 13,
  // San Francisco, by default
  initialCenter: {
    lat: 40.758896,
    lng: -73.985130
  }
}


export default GoogleApiWrapper({
    apiKey: ('AIzaSyBUcG-ocnq92foLawQ6Hvf8Xtyxjp-XXhY')
  })(MapContainer)

  export const BOROUGHS = {
MANHATTAN: {lat:40.758896 ,lng:-73.985130},
BROOKLYN: {lat:40.650002 ,lng:-73.949997},
BRONX: {lat:40.837048,lng:-73.865433},
QUEENS: {lat:40.6814922,lng:-73.8365236},
STATENISLAND: {lat:40.579021,lng: -74.151535},




  } 