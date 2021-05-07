import * as React from 'react'
import { StyleSheet, Text, TextInput, View,TouchableOpacity,Alert, KeyboardAvoidingView, KeyboardAvoidingViewBase} from 'react-native';
import db from '../config';
import firebase  from 'firebase';
import AppHeader from '../components/AppHeader'

export default class BookRequestScreen extends React.Component {
    constructor (){
        super()
        this.state={
            userId: firebase.auth().currentUser.email,
             BookName:"",
             ReasonToRequest:"",
             description:"",
             randomRequestId:""

        }
    }
    createUniqueTd(){
        return Math.random().toString(36).subString(7);
      }

addRequest=(BookName,ReasonToRequest)=>{
var userId = this.state.userId
var randomRequestId = this.createUniqueTd ()
db.collection('requested_books').add({
    "user_Id":userId,
    "Book_Name":BookName,
    "Reason_To_Request":ReasonToRequest,
    "request_Id":randomRequestId
})
this.setState({
    BookName:"",
    ReasonToRequest:""
})
return Alert.alert("Book Requested Succesfully")
}
getIsBookRequestActive(){
    db.collection("users")
    .where('email_id','==',this.state.userId)
    .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
            this.setState({
                isBookRequestActive:doc.data.isBookRequestActive
            })
        })
    })
}
sendNotification=()=>{
    db.collection('users').where('email_id','==',this.state.userId).get()
    .then((snapshot)=>{
       snapshot.forEach((doc)=>{
       var name = doc.data().first_name
       var lastName = doc.data().last_name


        db.collection('all_notification').where('request_id','==',this.state.requestId).get()
        .then((snapshot)=>{
           snapshot.forEach((doc)=>{
            var donorId = doc.data().donor_id
            var lastName = doc.data().last_name

            db.collection('all_notification').add({
                "targeted_user_id" : donorId,
                "message" : name +" " + lastName + "received the book" + bookName,
                "notification_status":"unread",
                "book_name":bookName
            })
           })
        })

       })
    })
}
render(){
    if(this.state.isBookRequestActive === true){
        return(
            <View style = {{flex:1,justifyContent:'center'}}>
                <View style = {{borderColor:"orange",borderWidth:2,justifyContent:"center",alignItems:'center',padding:20}}>
                    <Text>Book Name</Text>
                    <Text>{this.state.requestedBookName}</Text>
                </View>
                <View style = {{borderColor:"orange",borderWidth:2,justifyContent:'center',alignItems:"center",padding:2}}>
                    <Text>Book Status</Text>
                    <Text>{this.state.bookStatus}</Text>
                </View>
                <TouchableOpacity style={{borderWidth:1,borderColor:'orange',backgroundColor:"orange",width:300}}>
                    <Text>I recieved the book</Text>
                </TouchableOpacity>
            </View>
        )

    }
    else{
        return(
            <View style = {{flex:1}}>
                <MyHeader title = "Request Book" navigation = {this.props.navigation}></MyHeader>
                <ScrollView>
                    <KeyboardAvoidingView>
                        <TextInput 
                        style = {styles.formTextInput}
                        placeholder = {"enter book name"}
                        onChangeText = {()=>{
                            this.setState({
                                bookName:text
                            })
                        }}
                        value = {this.state.bookName}
                        ></TextInput>
                        <TextInput
                        style = {[styles.formTextInput,{height:300}]}
                        multiline
                        numberOfLines = {8}
                        placeHolder ={"why do you need the book"}
                        onChangeText = {()=>{
                            this.setState({
                                bookName:text
                            })
                        }}
                       value = {this.state.bookName}
                        ></TextInput>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        )
    }
}
render(){
    this.render(
        <View>
        <AppHeader></AppHeader>
        <KeyboardAvoidingView>
        <TextInput
        placeholder={"Book Name "}
        onChangeText={(text)=>{
         this.setState({
             BookName:text
         })
        }}
        value = {this.state.BookName}
        ></TextInput>

        <TextInput
        multiline
        numberOfLines={8}
        placeholder={"why do you need the book"}
        onChangeText={(text)=>{
           this.setState=({
               description:text
           })
        }}
        value={this.state.description}
        ></TextInput>
        <TouchableOpacity
        onPress={()=>{}}
        >
        <Text>Request</Text>
        </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
    )
}
}
const style = StyleSheet.create({
    formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10,
     },
     button:{
        width:"75%",
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#ff5722',
        borderRadius:10,
        shadowColor:"#000",
        shadowOffset:{
            width:0,
            height:0
        },
        shadowOpacity:0.44,
        shadowRadius:10.32,
        elevation:16,
        marginTop:20
     }
})