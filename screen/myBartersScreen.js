import React from 'react'
import{View,Text,TouchableOpacity,ScrollView,FlatList,StyleSheet} from 'react'
import{Card,Header,Icon} from 'react-native-elements'
import firebase from 'firebase'
import db from '../config';
export default class MyBartersScreen extends React.Component{
    static navigationOptions = {header:null};

    constructor(){
        super()
        this.state={
            userId:firebase.auth().currentUser.email,
            allBarters:[]
        }
    }
    getAllBarters=()=>{
        this.requestRef=db.collection("all_barters").where("donor_id","==",this.state.userId)
        .onSnapshot((snapshot)=>{
            var allBarters = snapshot.docs.map(document=>document.data());
            this.setState({
                allBarters:allBarters
            })
        })
    }
    sendBook=(bookDetails)=>{
     if (bookDetails.request_status === "Book Sent"){
         var requestStatus ="donor interested"
          db.collection("all_notification").doc(bookDetails.doc_id).update({
            "request_status":"Donor interseted "
          })
          this.sendNotification(bookDetails,requestStatus)
     }
     else{
      var requestStatus = "Book Sent"
      db.collection("all_barters").doc(bookDetails.doc_id).update({
        "request_status":"Book Sent "
      })
      this.sendNotification(bookDetails,requestStatus)
     }
    }
    sendNotification=(bookDetails,requestStatus)=>{
      var requestId = bookDetails.request_id
      var donorId = bookDetaisl.donor_id
      db.collection("all_notification")
      .where("request_id","==",requestId)
      .where("donor_id","==",donorId)
      .get()
      .then((snapshot)=>{
    snapshot.forEach((doc)=>{
    var message =""
    if(requestStatus === "Book Sent"){
      message = this.state.donorName + "send you book"
    }else{
      message = this.state.donorName + "has shown interset for donating book"
    }
    db.collection("all_notification").doc(doc.id).update({
      "message":message,
      "notification_status":"unread",
      "date": firebase.firestore.FieldValue.serverTimestamp(),
    })
    })
      })
    }
    keyExtractor = (item, index) => index.toString()

   renderItem = ( {item, i} ) =>(
     <ListItem
       key={i}
       title={item.book_name}
       subtitle={"Requested By : " + item.requested_by +"\nStatus : " + item.request_status}
       leftElement={<Icon name="book" type="font-awesome" color ='#696969'/>}
       titleStyle={{ color: 'black', fontWeight: 'bold' }}
       rightElement={
           <TouchableOpacity
            style={
              styles.button,
              {
                background : item.request_status === "book sent " ? "green" : "ff5722"
              }}
              onPress={()=>{
                this.sendBook(item)
              }}
            >
             <Text style={{color:'#ffff'}}>{
               item.request_status === "Book Sent" ? "Book Sent" :"Send Book"
             }</Text>
           </TouchableOpacity>
         
         }
       bottomDivider
     />
   )
   componentDidMount(){
    this.getAllBarters()
  }

  componentWillUnmount(){
    this.requestRef();
  }

    render(){
        return(
            <View style={{flex:1}}>
            <MyHeader navigation={this.props.navigation} title="My Barters"/>
            <View style={{flex:1}}>
              {
                this.state. allBarters.length === 0
                ?(
                  <View style={styles.subtitle}>
                    <Text style={{ fontSize: 20}}>List of all book Barters</Text>
                  </View>
                )
                :(
                  <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.allBarters}
                    renderItem={this.renderItem}
                  />
                )
              }
            </View>
          </View>
        )
    }
}
const styles = StyleSheet.create({
    button:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       },
      elevation : 16
    },
    subtitle :{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    }
  })
  