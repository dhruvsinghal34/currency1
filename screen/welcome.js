import React from 'react';
import { StyleSheet, Text, TextInput, View,TouchableOpacity,Alert,KeyboardAvoidingViewBase,Modal,ScrollView} from 'react-native';
import firebase from 'firebase'

export default class Welcome extends React.Component{
    constructor(){
        super()
        this.state={
            EmailID:"",
            Password:"",
            isModalVisible:'false',
            firstName:"",
            lastName:"",
            ComfirmPassword: "",
            address: "",
            contact: "",
            
        }
    }

    userLogin = async (emailId,Password) => {
        firebase.auth().signInWithEmailAndPassword(emailId,Password).then(()=>{
         this.props.navigation.navigate('Donate')
        }).catch((error)=>{
          var errorCode = error.Code
           var errorMessage=error.message
           return Alert.alert(errorMessage)
        })
      }
  
      userSignup = async (emailId,Password,confirmPassword) => {
        if(Password!==comfirmPassword){
            return(
                Alert.alert("password does not matches with the confirm password")
            )
        }
        else{
            firebase.auth().createUserWithEmailAndPassword(emailId,Password).then(()=>{
             db.collection("users").add({
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            EmailAdress:this.state. EmailID,
            Password:this.state.Password,
            confirmPassword:this.state.confirmPassword,
            HomeAddress:this.state.Address,
            PhoneNumber:this.state.contact,
            isBookRequestActive : false
        })
        return(Alert.alert("user is added succesfully",'',[
          {text:"OK",onPress:()=>{
            this.setState({
              modalVisible:false,
           })
          }}
        ]))
        }).catch((error)=>{
          var errorMessage = error.message;
          return(Alert.alert(errorMessage))
        })
        } }

  
  showModal= async () => {
    return(
        <Modal
         animationType="fade"
         transparent={true}
         visible={this.state.modalVisible}>
          <View>
          <ScrollView>
          <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
        <Text
          style={styles.modalTitle}
          >Registration</Text>
        <TextInput
          style={styles.formTextInput}
          placeholder ={"first Name"}
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              firstName: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"last Name"}
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              lastName: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Contact"}
          maxLength ={10}
          keyboardType={'numeric'}
          onChangeText={(text)=>{
            this.setState({
              contact: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"address"}
          multiline = {true}
          onChangeText={(text)=>{
            this.setState({
                address: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Email"}
          keyboardType ={'email-address'}
          onChangeText={(text)=>{
            this.setState({
              EmailId: text
            })
          }}
        /><TextInput
          style={styles.formTextInput}
          placeholder ={"Password"}
          secureTextEntry = {true}
          onChangeText={(text)=>{
            this.setState({
              Password: text
            })
          }}
        /><TextInput
          style={styles.formTextInput}
          placeholder ={"Confrim Password"}
          secureTextEntry = {true}
          onChangeText={(text)=>{
            this.setState({
              confirmPassword: text
            })
          }}
        />

        <View style={styles.modalBackButton}>
          <TextInput
          style={styles.formTextInput}
          placeholder = {"country curreny  code"}
          maxLength = {8}
          onChangeText={(text)=>{
              this.setState({
                currencyCode:text
              })
          }}
          ></TextInput>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={()=>
              this.userSignUp(this.state.EmailId, this.state.Password, this.state.confirmPassword)
            }
          >
          <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
          </View>
          <View style={styles.modalBackButton}> 
          <TouchableOpacity style={styles.cancelButton} 
          onPress={()=>this.setState({modalVisible:false})}>
       <Text style={{color:'#ff5722'}}>Cancel</Text> 
       </TouchableOpacity> 
       </View> 
       </KeyboardAvoidingView>
       </ScrollView>
          </View>
         </Modal>
 )
}

render(){
    return(
        <View style={styles.container}>
        <View>
        {this.showModal()}
        <TextInput
        style={styles.inputBox}
        placeholder="Enter your Email ID"
        keyboardType={"email-address"}
        onChangeText={text => this.setState({EmailID:text})}
        value={this.state.EmailID}
        ></TextInput>
        <TextInput
         style={styles.inputBox}
         placeholder="Enter your Password"
         secureTextEntry={true}
         onChangeText={text => this.setState({Password:text})}
        value={this.state.Password}
        ></TextInput>

        <TouchableOpacity style={styles.button}
        onPress={()=>{this.userLogin(this.state.EmailID,this.state.Password)}}>
        <Text>
        login in 
        </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}
        onPress={()=>{this.setState({modalVisible:true})}}>
        <Text>
        sign up 
        </Text>
        </TouchableOpacity>
        </View>
        </View>
    )
}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
     inputBox: {
      marginTop: 0,
      marginBottom:80,
      width: '190%',
      alignSelf: 'center',
      height: 40,
      textAlign: 'center',
      borderWidth: 4,
    },
    button: {
        marginTop: 40,
        marginLeft: 60,
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 30,
        backgroundColor: 'blue',
      },
      KeyboardAvoidingView:{ 
    flex:1, 
    justifyContent:'center', 
    alignItems:'center'
     },
     modalTitle :{ 
    justifyContent:'center', 
    alignSelf:'center', 
    fontSize:30, 
    color:'#ff5722', 
    margin:50 
}, 
modalContainer:{
     flex:1, 
     borderRadius:20, 
     justifyContent:'center',
      alignItems:'center', 
      backgroundColor:"#ffff", 
      marginRight:30, 
      marginLeft : 30, 
      marginTop:80, 
      marginBottom:80, 
    }, 
    formTextInput:{ 
    width:"75%", 
    height:35,
     alignSelf:'center', 
     borderColor:'#ffab91', 
     borderRadius:10, 
     borderWidth:1, 
     marginTop:20, 
     padding:10 
    }, 
    registerButton:{ 
    width:200, 
    height:40,
     alignItems:'center', 
     justifyContent:'center',
      borderWidth:1, 
      borderRadius:10, 
      marginTop:30
     }, 
     registerButtonText:{ 
         color:'#ff5722', 
         fontSize:15, 
         fontWeight:'bold' 
        },
         cancelButton:{ 
    width:200, 
    height:30,
     justifyContent:'center',
      alignItems:'center', 
      marginTop:5, 
    },
  });