import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text, View, StyleSheet, Dimensions, FlatList} from 'react-native';
import countries from './src/Countries.js';
//import { ScrollView } from 'react-native-gesture-handler';
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";

const Tab = createBottomTabNavigator();
let { height, width } = Dimensions.get("window");
// ({navigation})




class Home extends Component  {
    
  constructor(args) {
    super(args);
    this.Offset = 0;
  
    const dataProvider = new DataProvider((r1, r2) => {
      return r1.key !== r2.key;
    })
    
    this._layoutProvider = new LayoutProvider((i) => 'N', (type, dim) => {
      switch (type) {
        case "N":
          dim.width = width;
          dim.height = 100;
          break;
        
        default:
          dim.width = 0;
          dim.height = 0;
          break;
      };
    })
  
    
    this.state = {
      dataProvider: dataProvider.cloneWithRows(countries)
    }
    
    this._rowRender = (type, data) => {
      const { country, capital } = data;
      switch (type) {
        case "N":
          return (
            <View style={styles.display}>
              <Text style={styles.text}>{country}</Text>
              <Text style={styles.text}>{capital}</Text>
            </View>
          );
      }
    }

    this._onScroll = event => {
    
      const currentOffset = event.nativeEvent.contentOffset.y;
      let dif = currentOffset - this.Offset;

      if (Math.abs(dif) < 20)
        return

      if (dif < 0) {
        this.props.navigation.setParams({ showTabBar: true });
      } else {
        this.props.navigation.setParams({ showTabBar: false });
      }

      this.Offset = currentOffset;
  
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <RecyclerListView
          rowRenderer={this._rowRender}
          dataProvider={this.state.dataProvider}
          layoutProvider={this._layoutProvider}
          onScroll={e => this._onScroll(e)}    
        />
      </View>
    );
  }

}

function Screen1() {
  return (
    <View style={styles.display1}>
      <Text style={styles.text}> This is Screen1 </Text>
    </View>
  );
}

function Screen2() {
  return (
    <View style={styles.display2}>
      <Text style={styles.text}> This is Screen2 </Text>
    </View>
  );
}

function App() {
  const isTabBarVisible = navState => {
    if (!navState) {
      return true;
    }
  
    let tabBarVisible = navState.routes[navState.index].params
      ? navState.routes[navState.index].params.showTabBar
      : true;

    return tabBarVisible;
  };

  return (
    <View style={{width: '100%', height: '100%'}}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route, navigation}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Screen1') {
                iconName = 'arrow-circle-right';
              } else if (route.name === 'Screen2') {
                iconName = 'telegram';
              }

              // You can return any component that you like here!
              return (
                <Icon
                  name={iconName}
                  size={25}
                  color={color}
                  scrollEnabled={true}
                />
              );
            },
            tabBarVisible: isTabBarVisible(navigation.dangerouslyGetState()),
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'green',
            style: {height: 50},
          }}
        >
          <Tab.Screen name="Home" component={Home} listeners={{}} />
          <Tab.Screen name="Screen1" component={Screen1} />
          <Tab.Screen name="Screen2" component={Screen2} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  normalDot: {
    height: '100%',
    width: '100%',
  },
  display: {
    padding:20,
    backgroundColor: 'pink',
    alignItems: 'center',
    
  },
  text: {
    fontSize: 20,
  },
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    //backgroundColor: 'white',
    elevation: 8,
  },
  display1: {
    marginTop: 250,
    backgroundColor: 'yellow',
    padding: 50,
    alignItems: 'center',
  },
  display2: {
    marginTop: 250,
    backgroundColor: 'red',
    padding: 50,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    
},
});
      
      
export default App;
