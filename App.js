import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text, View, StyleSheet, Dimensions, FlatList} from 'react-native';

//import { ScrollView } from 'react-native-gesture-handler';
//import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";

const countries= [
  { 
      key:1,
      country: 'India',
      capital: 'New Delhi',
  },
  {
      key:2,
      country: 'USA ',
      capital: 'Washington DC',
  },
  {
    key:3,  
    country: 'Sri Lanka',
      capital: 'Colombo',
  },
  {
    key:4,
      country: 'Germany ',
      capital: 'Berlin',
  },
  {
      key:5,
      country: 'China ',
      capital: 'Beijing',
  },
  {
    key:6,
      country: 'Russia',
      capital: 'Moscow',
  },
  {
    key:7, 
    country: 'Argentina',
      capital: 'Bueno aires',
  },
  {
      key:8,  
    country: 'Japan',
      capital: 'Tokyo',
  },
  {
    key:9,
    country: 'Sri Lanka',
    capital: 'Colombo',
},
{
  key:10,
    country: 'Germany ',
    capital: 'Berlin',
},
{
    key:11,
    country: 'China ',
    capital: 'Beijing',
},
{
  key:12,
    country: 'Russia',
    capital: 'Moscow',
},
{
  key:13,
    country: 'Argentina',
    capital: 'Bueno aires',
},
{
  key:14,
    country: 'Japan',
    capital: 'Tokyo',
},
]

const Tab = createBottomTabNavigator();
let {height, width} = Dimensions.get("window");
function Home ({navigation}) {
    

    //  dataProvider = new DataProvider((r1, r2) => {
    //     return r1 !== r2;
    // }).cloneWithRows(countries);

    //  layoutProvider = new LayoutProvider((i) => {
    //     return dataProvider.getDataForIndex(i).type;
    // }, (type,  dim) => {
    //     switch(type){
    //         case "Normal":
    //             dim.width= width;
    //             dim.height= 100;
    //             break;
            
    //         default:
    //             dim.width=0;
    //             dim.height=0;
    //             break;
    //     };
    // })
    
    // const rowRender= (type,data)=>{
    //     const {country , capital} = data.values;
    //     switch (type) {
    //     case "Normal":
    //      return(
    //         <View style={styles.display}>
    //             <Text style={styles.text}>{country}</Text>
    //             <Text style={styles.text}>{capital}</Text>
    //          </View>
    //     );
        
        
    


  const onScroll = event => {
    
    const currentOffset = event.nativeEvent.contentOffset.y;
    let dif = currentOffset - FlatList.Offset;

    if (dif < 0) {
      navigation.setParams({showTabBar: true});
    } else {
      navigation.setParams({showTabBar: false});
    }

    FlatList.Offset = currentOffset;
  };

 
  // return (
  //   <View style={styles.container}>
  //     <RecyclerListView 
  //         rowRenderer={rowRender} 
  //         dataProvider={dataProvider}
  //         layoutProvider={layoutProvider}  
  //         //onScroll={e => onScroll(e)}
          
  //                             >
    
  //     </RecyclerListView>
  //   </View>
  // );

  return(
        <View style={{height:'100%', width:'100%'}}>
            <FlatList
              onScroll={e => onScroll(e)}
              keyExtractor={(item)=>item.key}
              data={countries}
              renderItem={({item})=>(
                <View style={styles.display}>
                  <Text style={styles.text}>{item.country}</Text>
                  <Text style={styles.text}>{item.capital}</Text>
                </View>
              )}
             />
        </View>
  )
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
export default App;
