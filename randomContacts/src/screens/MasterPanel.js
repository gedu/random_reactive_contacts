import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, Alert } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements'; 

export default class MasterPanel extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: "User List",
        headerTitleStyle:{
            textAlign: 'center',
            fontFamily: "Xiaowei-Regular",
            flex: 1
        },
     });

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            data: [],
            error: null
        };
        
        this.arrayHolder = [];
        this.isSearching = false;
        this.askingMorePages = false;
    }

    componentDidMount() {
        this.props.doContactGet();
    }

    handleBackButton(){
        this.props.navigation.goBack();
        return true;
    }

    componentWillReceiveProps(nextProps) {
        console.log("PROPS: ", nextProps);
        if (nextProps.data.length > 0) {
            this.arrayHolder = nextProps.data
            this.setState({
                isLoading: false,
                data: nextProps.data
            });
        } else {
            this.setState({
                isLoading: nextProps.isLoading,
            });
        }

        if (nextProps.error != undefined) {
            Alert.alert(
                'Error',
                nextProps.error,
                [
                    { text: 'Do you want to reload', onPress: () => this.props.doContactGet() },
                ],
                { cancelable: false }
            );
        }
    
        if (!nextProps.isLoading) {
            this.askingMorePages = false;
        }
    }

    searchFilterFunction = text => {
        this.isSearching = text.length > 0;
        const newData = this.arrayHolder.filter(item => {
          const itemData = `${item.name.last.toLowerCase()}`;
          const textData = text.toLowerCase();
          return itemData.startsWith(textData);
        });
        this.setState({
          data: newData,
        });
      };

      render() {
          console.log("IS LOADING: ",this.state.isLoading);
        if (this.state.isLoading) {
            console.log("RENDER LOADING");
          return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator 
                style={[{ height: 80 }]}
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
                        <ListItem button onPress={() => { this.props.navigation.navigate('DetailView', { name: `${item.name.first}, ${item.name.last}`, gender: item.gender, avatar: item.picture.large, email: item.email }) }}
                        roundAvatar
                        title={`${item.name.last}, ${item.name.first}`}
                        titleStyle={{ fontFamily: "Xiaowei-Regular" }}
                        subtitle={item.email}
                        subtitleStyle={{ fontFamily: "Xiaowei-Regular" }}
                        avatar={{ uri: item.picture.thumbnail }}
                        containerStyle={{ borderBottomWidth: 0 }}
                        />
                    )}
                    keyExtractor={item => item.email}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                    onEndReached={this.onLoadMore}
                    onEndThreshold={0}
                />
            </List>
        );
      }

      renderHeader = () => {
        return (
          <SearchBar
            placeholder="Search by lastname"
            lightTheme
            round
            onChangeText={text => this.searchFilterFunction(text)}
            inputStyle={{ fontFamily: "Xiaowei-Regular" }}
            autoCorrect={false}
          />
        );
      };

      onLoadMore = () => {
        if (!this.isSearching && !this.askingMorePages) {
            this.askingMorePages = true;
            this.props.doContactGet();
        }
      };

}