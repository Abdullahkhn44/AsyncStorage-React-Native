import { StatusBar } from 'expo-status-bar';
import { useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {

  const [name, setName] = useState();
  
  const save = async() => {
    try{
      await AsyncStorage.setItem("Myname",name)
    }
    catch(err) {
      alert(err)
    }
  };
  const load = async() => {
    try{
      let name= await AsyncStorage.getItem("Myname")

      if(name!== null){
        setName(name);
      }
    }
    catch(err) {
      alert(err)
    }
  };
  const remove = async() => {
    try{
      await AsyncStorage.removeItem("Myname");
    }
    catch(err) {
      alert(err);
    }
    finally{
      setName("");
    }
  };
  useEffect(()=>{
    load();
  },[])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
  
     
      <Image source={require("./assets/welcome.png")}
      style={{width:'100%', height:100, marginTop:-100}} resizeMode='contain' />

      <Text style={{height:30,color:'gold'}}>{name}</Text>
      <Text style={styles.namee}> Your Name</Text>
     
      <TextInput style={styles.txtInput} onChangeText={(text) => setName(text)}  />

      <TouchableOpacity style={styles.buton} onPress={()=> save()}>
        <Text style={{color:"black",fontWeight:'700'}}>Save Details</Text>

      </TouchableOpacity>

      <TouchableOpacity style={styles.buton} onPress={()=> remove()}>
        <Text style={{color:"black",fontWeight:'700'}}>Delete Details</Text>

      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius:105,

  },
  namee:{
    fontSize:25,
    color:'gold',
    fontWeight:"400"
  },
  txtInput:{
    borderWidth:3,
    borderColor:"yellow",
    alignSelf:'stretch',
    padding:17,
    margin:32,
    height:64,
    fontSize:24,
    fontWeight:'400',
    borderTopLeftRadius:25,
    borderBottomRightRadius:25,
    backgroundColor:'white',
    
    
  },
  buton:{
    backgroundColor:"gold",
    paddingVertical:12,
    paddingHorizontal:32,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'stretch',
    marginTop:20,
    marginHorizontal:32,
    borderTopLeftRadius:25,
    borderBottomRightRadius:25
  }
});
