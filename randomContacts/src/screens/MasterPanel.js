import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements'; 

export default class MasterPanel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            error: null
        };
        
        console.log("CONSTRUCTOR");
        this.arrayHolder = [];
    }

    componentDidMount() {
        this.props.doContactGet();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data != null) {
            console.log('success: the state', nextProps)
            this.arrayHolder.push.apply(this.arrayHolder, nextProps.data)
            this.setState({
                data: nextProps.data
            });
        }

        if (nextProps.error != undefined) {
            Alert.alert(
                'Error',
                nextProps.error,
                [
                    { text: 'Do you want to reload', onPress: () => this.props.doContactGet() },
                ],
                { cancelable: false })
        }
    }

    searchFilterFunction = text => {
        const newData = this.arrayHolder.filter(item => {
          const itemData = `${item.name.last.toLowerCase()} ${item.name.first.toLowerCase()} `;
          const textData = text.toLowerCase();
          return itemData.indexOf(textData) > -1;
        });
        this.setState({
          data: newData,
        });
      };

      render() {
        if (this.state.loading) {
          return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator 
                style={[styles.centering, { height: 80 }]}
                size="large"
                color="#0000ff"/>
            </View>
          );
        }
        return (
            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <ListItem button onPress={() => { this.props.navigation.navigate('DetailView', { name: item.name.first + " " + item.name.last, gender: item.gender }) }}
                        roundAvatar
                        title={`${item.name.last} ${item.name.first}`}
                        subtitle={item.email}
                        avatar={{ uri: item.picture.thumbnail }}
                        containerStyle={{ borderBottomWidth: 0 }}/>
                    )}
                    keyExtractor={item => item.email}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                />
            </List>
        );
      }

      renderHeader = () => {
        return (
          <SearchBar
            placeholder="Type Here..."
            lightTheme
            round
            onChangeText={text => this.searchFilterFunction(text)}
            autoCorrect={false}
          />
        );
      };

}