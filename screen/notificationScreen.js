import React from 'react'
import {View,Text,ListItem,MyHeader,FlatList} from 'react-native'
import SwipeableFlatList from '../components/SwipeableFlatlist'
import firebase from 'firebase'
export default class NotificationScreen extends React.Component{
    constructor(){
    super()
    this.state={
    userId:firebase.auth().currentUser.email,
    allNotification:[]
    }
    this.notificationRef = null 
    }
    getNotification=()=>{
      this.requestRef = db.collection("all notification")
      .where("notification_status","==","unread")
      .where("targeted_user_id","==",this.state.userId)
      .onSnapshot((snapshot)=>{
        var allNotification = []
        snapshot.docs.map((doc)=>{ 
            var notifiaction = doc.data()
            notification["doc_id"] = doc.doc_id
            allNotification.push(notifiaction)
        })
        this.setState=({
            allNotification:allNotification
        })
      })
    }
    componentDidMount(){
        this.getNotification()
    }

    keyExtractor = ( item,index) => index.toString()

    renderItem=({item,index})=>{
          return(
              <ListItem
              key={index}
              title={item.book_name}
              titleStyle={{color:'black',fontWeight:'bold'}}
              subtitle={item.message}
              bottomDivider
              ></ListItem>
          )
    }
render(){
    return(
        <View>
        <View style={{flex:0.1}}>
        <MyHeader title="notifications" navigation={this.props.navigation}/>
        </View>
        <View style={{flex:0.9}}>
        {
            this.state.allNotification.lenght === 0 
           
            ?(
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{fontSize:25}}>you have no Notification</Text>
                </View>
            )
            :(
                <SwipeableFlatList allNotification={this.state.allNotification}></SwipeableFlatList>
            )
        }
        </View>
        </View>
    )
}
}