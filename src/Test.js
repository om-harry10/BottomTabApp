import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text, View, StyleSheet, Dimensions} from 'react-native';

//import { ScrollView } from 'react-native-gesture-handler';
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";


const countries = [
    {    type:'Normal',
         values:{
                country: 'India',
                capital: 'New Delhi',
            },
    },
    {
            type:'Normal',
            values:{
                country: 'USA ',
                capital: 'Washington DC',
            },
          },{
            type:'Normal',
         values:
            {
                country: 'Sri Lanka',
                capital: 'Colombo',
            },
          },{
            type:'Normal',
         values:
            {
                country: 'Germany ',
                capital: 'Berlin',
            },
          },{
            type:'Normal',
         values:
            {
                country: 'China ',
                capital: 'Beijing',
            },
          },{
            type:'Normal',
         values:
            {
                country: 'Russia',
                capital: 'Moscow',
            },
          },{
            type:'Normal',
         values:
            {
                country: 'Argentina',
                capital: 'Bueno aires',
            },
          },{
            type:'Normal',
         values:
            {
                country: 'Japan',
                capital: 'Tokyo',
            },
          },
           
];

const Tab = createBottomTabNavigator();
let {height, width} = Dimensions.get("window");
function Home ({navigation}) {
    

     dataProvider = new DataProvider((r1, r2) => {
        return r1 !== r2;
    }).cloneWithRows(countries);

     layoutProvider = new LayoutProvider((i) => {
        return dataProvider.getDataForIndex(i).type;
    }, (type,  dim) => {
        switch(type){
            case "Normal":
                dim.width= width;
                dim.height= 100;
                break;
            
            default:
                dim.width=0;
                dim.height=0;
                break;
        };
    })
    
    const rowRender= (type,data)=>{
        const {country , capital} = data.values;
        switch (type) {
        case "Normal":
         return(
            <View style={styles.display}>
                <Text style={styles.text}>{country}</Text>
                <Text style={styles.text}>{capital}</Text>
             </View>
        );
        
        
    }
}

  // const onScroll = event => {
  //   RecyclerListView.initialOffset;
  //   const currentOffset = event.nativeEvent.contentOffset.y;
  //   let dif = currentOffset - RecyclerListView.initialOffset;

  //   if (dif < 0) {
  //     navigation.setParams({showTabBar: true});
  //   } else {
  //     navigation.setParams({showTabBar: false});
  //   }

  //   RecyclerListView.initialOffset = currentOffset;
  // };

 
  return (
    <View style={styles.container}>
      <RecyclerListView 
          rowRenderer={rowRender} 
          dataProvider={dataProvider}
          layoutProvider={layoutProvider}  
          //onScroll={e => onScroll(e)}
          
                              >
    
      </RecyclerListView>
    </View>
  );
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

function Test() {
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
                iconName = focused ? 'home' : 'home';
              } else if (route.name === 'Screen1') {
                iconName = focused
                  ? 'arrow-circle-right'
                  : 'arrow-circle-right';
              } else if (route.name === 'Screen2') {
                iconName = focused ? 'telegram' : 'telegram';
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
          }}>
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
export default Test;
