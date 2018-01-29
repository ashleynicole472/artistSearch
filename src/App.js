import React, { Component } from 'react';
import {cyan500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import DatePicker from 'material-ui/DatePicker';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import {red500, yellow500, blue500, cyan100} from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import LinearProgress from 'material-ui/LinearProgress';
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

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;

const LinearProgressExampleSimple = () => (
  <LinearProgress mode="indeterminate" />
);


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      artistName: ""
    };
  }

searchArtist(event,newvalue){
  console.log(newvalue);
  
}

handleSumbit(event){
  console.log(event);
}

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>

        <AppBar title="My AppBar" >
          <Badge
            badgeContent={10}
            secondary={true}
            badgeStyle={{top: 12, right: 19}}
          >
            <IconButton tooltip="Notifications">
              <NotificationsIcon color="black"/>
            </IconButton>
          </Badge>
        </ AppBar>

         <br />

         <div className="main">

         <TextField
          hintText="Search for an artist"
          floatingLabelText="Search for an artist"
          onChange={this.searchArtist}
         />

          <RaisedButton label="Search" secondary={true} style={style} onClick={this.handleSumbit}
          />
        </div>

        <Paper zDepth={1}>
            <BottomNavigation selectedIndex={this.state.selectedIndex} color={cyan100}>
              <BottomNavigationItem
                label="Recents"
                icon={recentsIcon}
                onClick={() => this.select(0)}
              />
              <BottomNavigationItem
                label="Favorites"
                icon={favoritesIcon}
                onClick={() => this.select(1)}
              />
              <BottomNavigationItem
                label="Nearby"
                icon={nearbyIcon}
                onClick={() => this.select(2)}
              />
            </BottomNavigation>
      </Paper>

    </MuiThemeProvider>
    );
  }
}

export default App;
