import React from 'react'
import {View,StyleSheet,Text,FlatList,TouchableOpacity} from 'react-native'
import {ListItem} from 'react-native-elements'
import firebase from 'firebase'
import db from '../config'
import MyHeader from '../components/MyHeader'

export default class MyReceivedBooksScreen extends Compenent {
    Constructor(){
        super()
        this.state = {
            userId : firebase.auth().currentUser.email,
            receivedBooksList : []
        }
        this.requestRef = null
    }
    getRecievedBookList = ()=>{
        this.requestRef = db.collection("requested_books")
        .where('user_id','==',this.state.userId)
        .where("book_status","==",'received')
        .onSnapshot((snapshot)=>{
          var receivedBooksList = snapshot.docs.map((doc) => doc.data())
          this.setState=({
              receivedBooksList:receivedBooksList
          })
        })
    }
    componentDidMount(){
        this.getReceivedBooksList()
    }
        componentWillUnmount(){
            this.requestRef();  
        }
        keyExtractor = (item,index) => index.toString()

        renderItem = ({item,i}) =>{
            console.log(item.book_name)
            return(
                <ListItem
                key={i}
                title={item.book_name}
                subtitle={item.bookStatus}
                titleStyle={{color:"black",fontWeight:'bold'}}
                bottomDivider
                ></ListItem>
            )

        }
        render(){
            return(
                <View style={{flex:1}}>
                 <MyHeader title="Recieved Books" navigation = {this.props.navigation}></MyHeader>
                 <View style={{flex:1}}>
                  {
                      this.state.receivedBooksList.lenght === 0
                      ?(
                          <View style={styles.subContainer}>
                              <Text style={{fontSize:20}}>List of all Received Books</Text>
                          </View>
                      )
                      :(
                          <FlatList
                          keyExtractor = {this.keyExtractor}
                          data={this.state.receivedBooksList}
                          renderItem={this.renderItem}
                          ></FlatList>
                      )
                  }
                 </View>
                </View>
                
            )
        }
}

const styles = StyleSheet .create({
    subContainer:{
        flex:1,
        fontSize: 20,
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        width:100,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ff5722',
        shadowColor:'#000',
        shadowOffset :{
            width:0
        }
    }
})