import React, { Component } from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import axios from 'axios';
import logo from './logo.svg';
import resourcesAPI from './api/resourcesAPI';
import Home from './components/Home';
import EachBoroughPage from './components/EachBoroughPage';
const Data = ({ allAddress, jobAPI, gedAPI }) => {

}
class App extends Component {
  constructor() {
    super();
    this.state = {
      allAddress: [],
      checkBox: [''],
      borough: '',
      jobAPI: [],
      gedAPI: [],
      checked: false,
      checkedArr: []
    }
  }

  fetchListings = () => {
    Promise.all([
      resourcesAPI.getJobCenterListing(),
      resourcesAPI.getGEDListing()
    ])
      .then(([jobRes, gedRes]) => {
        console.log("jobRes.data", jobRes.data);
        console.log("gedRes.data", gedRes.data);
        let addresses = []
        let sb = []
        let bothAPI = [...jobRes.data].concat([...gedRes.data]);

        console.log("bothAPI", bothAPI)
        let matchingPropNames = [
          'borough',
          'city',
          'address',
          'contact_number',
          'latitude',
          'longitude',
          'nta',
          'program_site_name',
          'facility_name',
          'comments',
          'phone_number_s',
          'street_address']

        let obj = {}

        bothAPI.forEach(place => {
          if (!sb.includes(place.borough)) {
            sb.push(place.borough);
            for (const prop in place) {
              if (matchingPropNames.indexOf(prop) >= 0) {
                obj[prop] = place[prop]
              }
            }
          }
        })

        console.log(`ADD`, bothAPI)
        this.setState({
          allAddress: [...bothAPI],
          checkBox: ['', ...sb],
          jobAPI: [...jobRes],
          gedAPI: [...gedRes]
        })
        // console.log(`ALL`, this.state.allAddress)
      })
  }


  handleSelect = e => {
    this.setState({
      borough: e.target.value
    })
    console.log("this.state.borough", e.target.value)
  }

  handleCheckBox = e => {
    const { checkedArr } = this.state
    let choicesArr = ["Queens",
      "Manhattan",
      "Bronx",
      "Brooklyn",
      "StatenIsland"]

    choicesArr.map((served) => {
      if (served === e.target.name) {
        checkedArr.push(e.target.name)
        this.setState({
          checkedArr
        })
      }
    })
    console.log("e.target.name", e.target.name)
    console.log("checkedArr", checkedArr)
  }

  // HandleFilter = () => (
  //   this.state.checkBox.map(b => {
  //     return (
  //       <div>
  //         <input type='checkbox' name={b} onClick={this.handleCheckBox} checked={this.state.checked} />
  //         <label> {b} </label>

  //       </div >
  //     )
  //   })
  // )


  filterAllPlaces = () => {
    let { allAddress } = this.state
    console.log("place.borough", this.state.borough)
    console.log("allAddress", allAddress)
    return (
      <div>
        {allAddress.map(place => {
          if (place.borough === this.state.borough) {

            return (
              <ul>
                <h2>Facility: {place.facility_name || place.program_site_name}</h2>
                <li>Phone Number: {place.phone_number_s || place.contact_number}</li>
                <li>City: {place.city || place.borough} </li>
                <li>Address: {place.street_address || place.address} </li>
                <li> {place.comments ? `Comments: ${place.comments}` : null} </li>
              </ul>
            )
          }
        })
        }
      </div>
    )
  }

  renderBoroughPage = () => {
    const { allAddress, jobAPI, gedAPI } = this.state

    return (
      <Home allAddress={allAddress} jobAPI={jobAPI} gedAPI={gedAPI} />
    )
  }

  componentDidMount() {
    this.fetchListings();
  }

  render() {
    // console.log("render: ", this.state)
    let { borough, allAddress } = this.state
    return (
      <div className="App" >
        <nav>
          <Link to='/' >Home</Link>
          {"   "}
          <Link to='/byborough' >Centers By Borough</Link>
          {"   "}
        </nav>

        <h1> Filter Select All Places</h1>
        {/* {this.HandleFilter()} */}
        < br />
        
      <Switch>
          <Route exact path="/" render={() => (

            <div>
              <div>
                <h1>Take Your First Step </h1>
                <h2>Help Me Find</h2>
                <div>
                  <div id="wrapper">
                    <div className="boxes">
                      <input
                        type="checkbox"
                        name="GedListings"
                        onChange={this.handleCheckboxChange}
                        id="box-1" />
                      <label htmlFor="box-1"> GED Locations</label>
                      <input
                        type="checkbox"
                        name="JobListings"
                        onChange={this.handleCheckboxChange}
                        id="box-2" />
                      <label htmlFor="box-2"> Financial Assistance Locations </label>
                      <input
                        type="checkbox"
                        name="Other"
                        onChange={this.handleCheckboxChange}
                        id="box-3" />
                      <label htmlFor="box-3"> Other</label>
                    </div>
                    <div className="h2">
                      <h2>In Location</h2>
                    </div>
                    <div className="boxes1">
                      <form onSubmit={this.handleSubmit}>
                        <input
                          type="checkbox"
                          name="Queens"
                          onChange={this.handleCheckboxChange}
                          id="box2-1" />
                        <label htmlFor="box2-1"> Queens</label>
                        <input
                          type="checkbox"
                          name="Manhattan"
                          onChange={this.handleCheckboxChange}
                          id="box2-2" />
                        <label htmlFor="box2-2"> Bronx </label>
                        <input
                          type="checkbox"
                          name="Bronx"
                          onChange={this.handleCheckboxChange}
                          id="box2-3" />
                        <label htmlFor="box2-3">Manhattan </label>
                        <input
                          type="checkbox"
                          name="Brooklyn"
                          onChange={this.handleCheckboxChange}
                          id="box2-4" />
                        <label htmlFor="box2-4">Brooklyn </label>
                        <input
                          type="checkbox"
                          name="StatenIsland"
                          onChange={this.handleCheckboxChange}
                          id="box2-5" />
                        <label htmlFor="box2-5">Staten Island </label>
                      </form>
                    </div>
                    <div>
                      <button>SUBMIT</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )



          } />
          <Route path="/byborough" render={() => (
            <div>
              {borough ? this.filterAllPlaces() : null}
              <EachBoroughPage />
            </div>
          )}/>
        </Switch>

      </div>

    );
  }
}


export default App;
