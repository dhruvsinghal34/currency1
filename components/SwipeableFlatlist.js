import React from  'react'
import {View,Text,Animated,Dimensions,StyleSheet,TouchableHighLight} from 'react-native'
import db from '../config'
import {SwipeListView} from 'react-native-swipe-list-view'
import {ListItem,Icon } from 'react-native-elements'
export default class SwipeableFlatlist extends React.Component{
   constructor(props){
       super(props)
       this.state={
           allNotifications:this.props.allNotifications
       }
    }
    updateMarkAsRead=(notification)=>{
      db.collection("all_notification") .doc(notification.doc_id) .update({
          "notification_status":"read"
      })
    }
    onSwipeValueChange = swipeData =>{
        var allNotifications=this.state.allNotifications
        const{key,value} = swipeData;
    
        if(value< Dimensions.get('window').width){
            const newData = [... allNotifications];
            const prevIndex = allNotifications.findIndex(item => item.key === key )
            this.updateMarkAsRead(allNotifications[prevIndex])
            newData.splice(prevIndex,1)
            this.setState({
                allNotifications:newData
            })
    
        }
    }

    renderList = data =>{
        <ListItem
        leftElement={<Icon name="book" type="font-awesome" color="#696969"/>}
        title={data.Item.Book_name}
        titleStyle={{color:"black" , fontWeight:"bold"}}
        subtitle={data.item.message}
        bottomDivider
        ></ListItem>
    }

    renderHiddenItem =()=>{
        <View style={style.rowBack}>
            <View style={[style.backRightbtn,style.backRightbtnRight]}>
                <Text style={Style.backTextWhite}></Text>
            </View>
        </View>
    }
    render(){
        return(
            <View style={style.container}>
                <SwipeListView
                disableRightSwipe
                data={this.state.allNotifications}
                renderItem={this.renderItem}
                renderHiddenItem={this.renderHiddenItem}
                rightOpenValue={-Dimensions.get('windows').windows}
                previewRowKey={"0"}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onSwipeValueChange={this.onSwipeValueChange}
                ></SwipeListView>
                </View>
        )
    }
}
const styles = StyleSheet.create({ 
    container: { 
    backgroundColor: "white", 
    flex: 1
     }, 
     backTextWhite: { 
    color: "#FFF", 
    fontWeight: "bold", 
    fontSize: 15, 
    textAlign: "center",
    alignSelf: "flex-start" 
    }, 
    rowBack: { 
    alignItems: "center",
    backgroundColor: "#29b6f6", 
    flex: 1, 
    flexDirection: "row", 
    justifyContent: "space-between", 
     paddingLeft: 15 
    }, 
    backRightBtn: { 
    alignItems: "center",
    bottom: 0, 
    justifyContent: "center", 
    position: "absolute", 
     top: 0,
    width: 100 
    }, 
    backRightBtnRight: { 
     backgroundColor: "#29b6f6", 
    right: 0 
     } 
    });