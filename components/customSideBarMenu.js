import React from 'react'
import {View,Text,TounchableOpacity} from 'react-native'
import{DrawerItems} from 'react-navigation-drawer'
import {Avatar} from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase'
import db from '../config';

export default class CustomSideBarMenu extends React.Component{
    constructor(){
        super()
        this.state={
          image:"",
          userId:firebase.auth().currentUser.email,
          name:"",
          docId:""
        }
      }
      selectPicture = async ()=>{
       const {cancelled,uri} = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
       
    
        if (!cancelled) {
         this.setState({
           image:uri
         })
         this.uploadImage(uri,this.state.userId)
        }
      }
      uploadImage= async (uri,imageName)=>{
        var response=await fetch(uri)
        var blob=await response.blob()
        var ref=firebase.storage().ref().child("user_profile/"+imageName)
        return(ref.put(blob)).then((response)=>{
          this.fetchImage(imageName)
        })
      }
      fetchImage= async (userId)=>{
        var ref=firebase.storage().ref().child("user_profile"+userId)
        ref.getDownloadURL().then((url)=>{
          this.setState({
            image:url
          })
        })
        .catch((error)=>{
          this.setState({
            image:"#"
          })
        })
      }
      getUserProfile=()=>{
       db.collection("users")
       .where("email_id","==",this.state.userId)
       .onSnapshot((querySnapshot)=>{
           querySnapshot.forEach((doc)=>{
              this.setState({
                  name:doc.data().first_name + " " + doc.data().last_name,
              })
           })
       })
      }
  render(){
      return(
        <View style={{flex:1}}>
        <View style={{ flex: 0.3, justifyContent: "center", alignItems: "center", backgroundColor: "#32867d", }}>
          <Avatar 
          rounded 
          source={{uri:this.state.image}}
          size={"xlarge"}
          onPress={
            ()=>{
             this.selectPicture()
            }
          }
          showEditButton
          ></Avatar>
          <Text style={{ fontWeight: "300", fontSize:20, color: "#fff", padding:10 }} > 
          {this.state.name} 
          </Text>
        </View>
        <View style={styles.drawerItemsContainer}>
          
          <DrawerItems {...this.props}/>
        </View>
        <View style={styles.logOutContainer}>
          <TouchableOpacity style={styles.logOutButton}
          onPress = {() => {
              this.props.navigation.navigate('WelcomeScreen')
              firebase.auth().signOut()
          }}>
            <Text>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
      )
  }
}