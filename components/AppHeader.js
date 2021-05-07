import React from 'react';
import { Header,Icon,Badge } from 'react-native-elements';
import { View, Text, StyleSheet ,Alert} from 'react-native';
import db from '../config'

export default class AppHeader extends React.Component{
 constructor(props){
   super(props)
   this.state={
    value:"",
   }
 }
 getNumberOfUnreadNotifications=()=>{
   db.collection("all_Notification").where("notification_status","==","unread")
   .onSnapshot((snapshot)=>{
     var unreadNotification=snapshot.docs.map((doc)=>doc.data())
     this.setState({
       value:unreadNotification.length
     })
   })
 }
 componentDidMount(){
   this.getNumberOfUnreadNotifications()
 }


 BellIconWithBadge =()=>{
 return(
   <View>
     <Icon name='bell' type='font-awesome' color='#696969' size={25}
     onPress={()=>this.props.navigation.navigate('Notification')}></Icon>
     <Badge 
     value={this.state.value}
     containerStyle={{position:'absolute',top:-4,right:-4}}
     ></Badge>
   </View>
 )
}

  render (){
    return (
      <Header
        leftComponent={<Icon name='bars' type='font-awesome' color='#696969'  onPress={() =>this.props.navigation.toggleDrawer()}/>}
        centerComponent={{ text:this.props.title, style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
        rightComponent={<BellIconWithBadge {...this.props}></BellIconWithBadge>}
        backgroundColor = "#eaf8fe"
      />
    );
  }
 
}
