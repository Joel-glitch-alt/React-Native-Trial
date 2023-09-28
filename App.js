import {View, Text, StyleSheet, TextInput, Button,ScrollView, FlatList,Pressable} from 'react-native'
import { useState } from 'react';
import ApiCalls from './components/ApiCall/ApiCalls';

export default function App () {
  const [ value, setValue ] = useState ("");
  const [listOfNotes, setListOfNotes] = useState([]);

  function handleOnChangeText (getEnteredText) {
    //console.log(getEnteredText);
    setValue(getEnteredText)
  }

  function handleOnPressButton () {
    //console.log(value)
     setListOfNotes(currentNotes => [...currentNotes,value]);
     setValue("")
  }

  function handleRemoveItem(getCurrentIndex) {
    let cpyListOfNotes = [...listOfNotes]
    
    cpyListOfNotes  = cpyListOfNotes.filter((_,index)=> getCurrentIndex !== index)
    setListOfNotes(cpyListOfNotes)
  }
  


  return (
       <View style= {{padding : 60,
       paddingHorizontal: 15,
       flex: 1
       }}>


        {/* second lane */}
        <View style = {styles.inputContainer}>

          <TextInput onChangeText = {handleOnChangeText} 
          style= {styles.input}
           placeholder='Add your Name Here' 
           value = {value}/>

          <Button onPress = {handleOnPressButton} 
          color = {"#000"}
           title = "Add  Note"
          />
          
        </View>

        <View style= {styles.listContainer}>
         <FlatList data={listOfNotes} renderItem={(itemData) =>(
          <Pressable onPress= {()=>handleRemoveItem (itemData.index)}>
                   <Text style = {styles.listItem}> {itemData.item}</Text>
          </Pressable>
          
         )} /> 
        
         {/* {
            listOfNotes.map((item, index)=>
            <Text style= {styles.listItem} key={`item${index}`}>{item}</Text>)
          } */}
          
        </View>

        <View style = {styles.apiContainer}>
        <ApiCalls/>
        </View>
        
       </View>
  )
}

const styles = StyleSheet.create ({
  inputContainer : {
    flexDirection: "row",
    paddingBottom : 30,
    borderBottomWidth : 1,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between"
  },

  input : {
    borderWidth: 1,
    borderColor : "#ddd",
    flex: 1
  },

  listContainer : {
    paddingTop : 30,
    flex: 1
  },

  listItem : {
    borderRadius: 1,
    borderColor : 'red',
    backgroundColor: 'green',
    padding: 20,
    marginBottom: 20,
    color: "white",
    fontSize: 20,
  },

  apiContainer : {
    flex : 2
  }
})