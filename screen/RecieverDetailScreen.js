import React from 'react'
import {View,Text} from 'react-native'
import{Card,Header,Icon} from 'react-native-elements'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import firebase from 'firebase'
import db from '../config'
export default class RecieverDetailScreen extends  React.Component{
    constructor(){
        super()
        this.state={
            userId:firebase.auth().currentUser.email,
            recieverId:this.props.navigation.getParam('details')["user_id"],
            requestId:this.props.navigation.getParam('details')["request_id"],
            bookName:this.props.navigation.getParam('details')["book_name"],
            reason_for_requesting:this.props.navigation.getParam('details')["reason_for_request"],
            recieverName:"",
            recieverAdress:"",
            recieverContact:"",
            recieverRequestDocId:""
        }
    }
    getRecieverDetails=()=>{
        db.collection("users").where('email_id','==',this.state.recieverId).get()
        .then(snapshot => {
                 snapshot.forEach(doc=>{
                     this.setState({
                        recieverName:doc.data().first_name,
                        recieverAdress:doc.data().adress,
                        recieverContact:doc.data().contact,
                     })
                 })
            }
        )
    }
    updateBookStatus=()=>{
        db.collection("all_donations").add({
            book_name: this.state.bookName,
            request_id:this.state.requestId,
            requested:this.state.recieverName,
            donor_id:this.state.userId,
            request_status:"Donaor Interseted "
        })
    }
    addNotification =()=>{
      var message = this.state.userName + "has shown interset in donationg book" 
      db.collection("all_notification").add({
        "trageted_user_id":this.state.recieverId,
        "donor_id":this.state.userId,
        "request_Id":this.state.requestId ,
        "book_name":this.state.bookName,
        "date": firebase.firestore.FieldValue.serverTimestamp(),
        "notification_status":"unread",
        "message":message
      })
    }
    componentDidMount(){
      this.getRecieverDetails()
    }

    render(){
        return(
            <View style={styles.container}>
            <View style={{flex:0.1}}>
              <Header
                leftComponent ={<Icon name='arrow-left' type='feather' color='#696969'  onPress={() => this.props.navigation.goBack()}/>}
                centerComponent={{ text:"Donate Books", style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
                backgroundColor = "#eaf8fe"
              />
            </View>
            <View style={{flex:0.3}}>
              <Card
                  title={"Book Information"}
                  titleStyle= {{fontSize : 20}}
                >
                <Card >
                  <Text style={{fontWeight:'bold'}}>Name : {this.state.bookName}</Text>
                </Card>
                <Card>
                  <Text style={{fontWeight:'bold'}}>Reason : {this.state.reason_for_requesting}</Text>
                </Card>
              </Card>
            </View>
            <View style={{flex:0.3}}>
              <Card
                title={"Reciever Information"}
                titleStyle= {{fontSize : 20}}
                >
                <Card>
                  <Text style={{fontWeight:'bold'}}>Name: {this.state.recieverName}</Text>
                </Card>
                <Card>
                  <Text style={{fontWeight:'bold'}}>Contact: {this.state.recieverContact}</Text>
                </Card>
                <Card>
                  <Text style={{fontWeight:'bold'}}>Address: {this.state.recieverAddress}</Text>
                </Card>
              </Card>
            </View>
            <View style={styles.buttonContainer}>
              {
                this.state.recieverId !== this.state.userId
                ?(
                  <TouchableOpacity
                      style={styles.button}
                      onPress={()=>{
                        this.updateBookStatus()
                        this.addNotification()
                        this.props.navigation.navigate('MyBarters')
                      }}>
                    <Text>I want to Donate</Text>
                  </TouchableOpacity>
                )
                : null
              }
            </View>
          </View>
        )
    }
}