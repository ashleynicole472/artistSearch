import React, { Component } from 'react';
import Footer from './Footer.js'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import {cyan500} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import moment from 'moment';

import './App.css';

const muiTheme = getMuiTheme({
  palette: {
    textColor: cyan500,
  },
  appBar: {
    height: 50,
  },
});

const style = {
  margin: 20,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      artistName: "",
      data: [],
      tableData: []
    };
    this.searchArtist=this.searchArtist.bind(this);
    this.handleSumbit=this.handleSumbit.bind(this);
    this.menuDrawer=this.menuDrawer.bind(this);
  }

searchArtist(event,newvalue){
  this.setState({
    artistName: newvalue
  })
};

//function to full searched artist from Bands In Town API
handleSumbit(event){
  var url = "https://rest.bandsintown.com/artists/"+this.state.artistName+"/events?app_id=boo"
  console.log(url);
    fetch(url, {
      method: "GET"
    })
    .then((responseData) => {
      return responseData.json();
    })
    .catch((error) => {
      console.log("Error Message: " + error);
    })
    .then((responseJSON) => {
      const rowInfo=responseJSON.map((element) =>
      //Function to allow only specific data from the object to be
      //displayed on the table in the frontend
      //moment allows the date to be formated in a specific way choosen
      //from moments website
        <tr>
          <td>{element.lineup}</td>
          <td>{element.venue.city}</td>
          <td>{element.venue.name}</td>
          <td>{moment(element.datetime).format('llll')}</td>
          <td>
          <RaisedButton label="Tickets" secondary={true} href={element.url} target="#"/ >
          </td>
        </tr>
      )
      this.setState({
        tableData: rowInfo
      })
    })
    .catch((errorJSON) => {
    });
  };

//menu drawer functions:
handleToggle = () =>
  this.setState({
    open: !this.state.open
  });

handleClose = () =>
  //menu drawer closes when click anywhere off the menu
  this.setState({
    open: false
  });

menuDrawer = () => {
  // open when someone clicks
  this.setState({
    open:true
  });
}

  render() {
    return (
          <div>
          <MuiThemeProvider muiTheme={muiTheme}>
            <AppBar title="Find a show near you" showMenuIconButton={true} onLeftIconButtonClick={this.menuDrawer} >
            </AppBar>

            <Drawer
              docked={false}
              width={200}
              open={this.state.open}
              onRequestChange={(open) =>
                this.setState({open})}
            >
            <MenuItem value="1" primaryText="Menu"/>
              <MenuItem value="2" primaryText="Bands In Town" href="https://news.bandsintown.com/home" target="#" />
              <MenuItem value="3" primaryText="Spotify" href="https://www.spotify.com/us/" target="#" />
              <MenuItem value="4" primaryText="Pandora" href="https://www.pandora.com/" target="#" />
              <MenuItem value="5" primaryText="Twitter" href="https://twitter.com/?lang=en" target="#" />
              <MenuItem value="6" primaryText="Facebook" href="https://www.facebook.com/" target="#" />
            </Drawer>

            <div className="main">
              <TextField
                hintText="Search for an artist"
                floatingLabelText="Search for an artist"
                onChange={this.searchArtist}
              />

              <RaisedButton
                label="Search"
                secondary={true}
                style={style}
                onClick={this.handleSumbit}
              />
            </div>
            <br />
            <br />
            <br />
            <br />
            <table>
              <tbody>
                <tr>
                  <th><u>Artist</u></th>
                  <th><u>City</u></th>
                  <th><u>Venue</u></th>
                  <th><u>Date</u></th>
                  <th><u>Tickets</u></th>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              {this.state.tableData}
              </tbody>
            </table>
        </MuiThemeProvider>
        <Footer />
      </ div>
    );
  }
}

export default App;
