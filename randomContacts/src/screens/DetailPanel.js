import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, BackHandler } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  name: {
    fontFamily: "Xiaowei",
    color: '#D20A4B',
    fontSize: 24,
    padding:10,
    textAlign:'center',
    marginTop:10
  },
  text:{
    fontFamily: "Xiaowei",
    fontSize:16,
    textAlign:'center',
    padding:5
  }
});

export default class DetailPanel extends Component {

  static defaultNavigationOptions = ({ navigation }) => ({
    title: "User Details",
    headerBackTitle: 'User List',
    headerTitleStyle:{
        textAlign: 'center',
        fontFamily: "Xiaowei",
        flex: 1
    },
 });

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true;
    });
  }

  render() {
    
    const avatar  = this.props.navigation.state.params.avatar;
    const name  = this.props.navigation.state.params.name;
    const gender  = this.props.navigation.state.params.gender;
    const email  = this.props.navigation.state.params.email;
    
    return(
      <View style={styles.container}>
        <View style={{
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
          <Image
            source={{ uri: avatar }}
            style={{width: 128, height: 128, margin: 10}}
            />
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.text}>Gender: {gender}</Text>
          <Text style={styles.text}>Email: {email}</Text>
          {/*<Text style={styles.text}>Hair Color: {params.data.hair_color}</Text> */}
        </View>

      </View>
    );
  }
}