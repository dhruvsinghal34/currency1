import * as React from 'react'
import {View,Text,ListItem,TouchableOpacity,FlatList,StyleSheet} from 'react-native'
import db from '../config'
import AppHeader from '../components/AppHeader'
export default class BookDonateScreen extends React.Component {
    constructor(){
        super();
        this.state = {
           allRequests : [],
           currencyCode:""
        }
        this.requestRef = null 
    }
    getAllRequets = ()=>{
        this.requestRef = db . collection("bookRequests")
        .onSnapshot((snapshot)=>{
            var allRequests = snapshot.docs.map(document => document.data());
            this.setState({
                allRequests : allRequests
            })
        })
    }
    getData(){
        fetch("https://data.fixer.io/api/Latest?access_key=if7dd48123a05ae588283b5e13fae944&format=1")
        .then(response=>{
            return response.json();
        }).then(responseData =>{
            var currencyCode = this.state.currencyCode
            var currency = responseData.rates.INR
            var value  = 69 / currency
            console.log(value);
        })
    }
 keyExtractor=(item,index)=> index.tostring()

   renderItem = ({item,i}) =>{
       console.log(item.bookName);
       return(
           <ListItem
           key={i}
           title={item.bookName}
           subtitle={item.description}
           titleStyle={{color:'black' , fontWeight: 'bold'}}
           rightElement={
               <TouchableOpacity style={style.button}
               onPress={()=>{
                   this.props.navigation.navigate("RecieverDetails",{'details':item})
               }}
               >
                <Text style={{color:'#ffff'}}>Donate</Text>
               </TouchableOpacity>
           }
           bottomDivider
           ></ListItem>
       )
   }

render(){
    this.render(
        <View style={{flex:1}}>
       <MyHeader title="Donate Book"></MyHeader>
       <View>
           {
               this.state.allRequests.lenght === 0 
             ?(
                <View style={{flex:1,fontSize:20,justifyContent:"center",alignContent:"center"}}>
                    <Text style={{fontSize:20}}>List of all books </Text>
                </View>
             )
             :(
                 <FlatList
                 keyExtractor={this.keyExtractor}
                 data={this.state.allRequests}
                 renderItem={this.renderItem}
                 ></FlatList>
             )
           }
       </View>
        </View>
    )
}
}
const style = StyleSheet.create({
    button:{
        width:100,
        height:30,
        justifyContent:"center",
        alignContent:"center",
        backgroundColor:"#ff5722",
        shadowColor:"#000",
        shadowOffset:{
            width:0,
            height: 8 
        }
    }
})