var formatTimeMSM = require('minutes-seconds-milliseconds');
var React = require('react');
var ReactNative = require('react-native');

var {
  Text,
  View,
  TouchableNativeFeedback,
  TouchableHighlight,
  AppRegistry,
  StyleSheet
} = ReactNative;

var Stopwatch = React.createClass({
getInitialState: function() {
  return {
    //never put logic inside of here that's a no no
    timeElapsed: null,
    isRunning: false,
    startTime: null,
    laps: []
  };
},
 render: function() {
   var self = this;
   return <View style={styles.containter}>
     <View style={[styles.header, this.border('yellow')]}>
       <View style={[this.border('red'), styles.timerWrapper]}>
         <Text style={styles.timer}>
         {formatTimeMSM(this.state.timeElapsed)}
        </Text>
      </View>
      <View style={[this.border('green'), styles.buttonWrapper]}>
        {this.startStopButton()}
        {this.LapButton()}
      </View>
   </View>

       <View style={[styles.footer, this.border('blue')]}>
       {this.laps()}
       </View>
  </View>;
 },
 laps: function(){
   return this.state.laps.map(function(time, index) {
     return <View style={styles.lap}>
     <Text style={styles.lapText}>
      Lap {index + 1}
     </Text>
     <Text style={styles.lapText}>
      {formatTimeMSM(time)}
     </Text>
     </View>;
   });
 },
 startStopButton: function() {
   var style = this.state.isRunning ? styles.stopButton : styles.startButton;

   return <TouchableHighlight
    underlayColor='grey'
    onPress={this.handleStartPress}
    style={[styles.button, style]}>
     <Text>
     {this.state.isRunning ? 'stop' : 'start'}
     </Text>
   </TouchableHighlight>;
 },
 LapButton: function() {
   return <TouchableHighlight
   style={styles.button}
   underlayColor='grey'
   onPress={this.handleLapPress}
   >
     <Text>
       lap
     </Text>
   </TouchableHighlight>;
 },
 handleStartPress: function() {

   if(this.state.isRunning) {
   console.log('start was pressed');
   clearInterval(this.interval);
   this.setState({isRunning: false});
   return;
 }
   this.setState({startTime: new Date()});

   this.interval = setInterval(() => {
  //update our state with a new value
  // calling state re-renders our view
  this.setState({
      timeElapsed: new Date() - this.state.startTime,
      isRunning: true
    });
  }, 30);
 },
 handleLapPress: function() {
   var lap = this.state.timeElapsed;
   this.setState({
     startTime: new Date(),
     //concat over pushing because we never want to modify the state directly
     laps: this.state.laps.concat([lap])
   });
 },
 border: function(color) {
  return {
           borderColor: color,
           borderWidth: 4
         };
   }
});

var styles = StyleSheet.create({
  containter: {
    flex: 1, //Fill the entire screen
    alignItems: 'stretch'
  },
  header: { //yellow
    flex: 1
  },
  footer: { //blue
    flex: 1
  },
  timerWrapper: {
      flex: 5, // gets 5 of total units, in this case 8
      //takes up 5/k available space where k = sum on n flexes within the view
      justifyContent: 'center',
      alignItems: 'center'
  },
  buttonWrapper: {
      flex: 3, // gets 3 of total units, in this case 8
      //takes up 3/k available space where k = sum on n flexes within the view
      flexDirection: 'row', //changed to row from react native default of column
      justifyContent: 'space-around',
      alignItems: 'center'
  },
  timer: {
    fontSize: 60
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton: {
    borderColor: '#00CC00'
  },
  stopButton: {
    borderColor: '#CC0000'
  },
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  lapText: {
    fontSize: 30
  }
});

AppRegistry.registerComponent('Stopwatch', () => Stopwatch);
