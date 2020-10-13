import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import SelectableGrid from 'react-native-selectable-grid'
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  navigation: any;
}

interface State {
  name: string;
}

const colorData =   [   { label: '1' , backgroundListColor:'#B3A7FF'  }, 
                        { label: '2' , backgroundListColor:'#FFA7D1'  }, 
                        { label: '3' , backgroundListColor:'#FFC28A'   }, 
                        { label: '4' , backgroundListColor:'#A7FFB0'   }, 
                        { label: '5' , backgroundListColor:'#FFE6A7'   }, 
                        { label: '6' , backgroundListColor:'#A7F4FF'   }, 
                        { label: '7' , backgroundListColor:'#F8A7FF'   }, 
                        { label: '8' , backgroundListColor:'#E3FFA7'   }
                    ];

class AddList extends React.Component<Props, State> {
    
  render() {
    var {selectedColor}= " ";
    return (
        
        <View style={styles.container}>
            
                
            <View style = {{ marginTop: RFValue(65),width: "80%"}}> 
                <TouchableOpacity onPress={() => this.props.navigation.navigate("My Lists")}>
                    <Icon name="chevron-thin-left" size={25} color="#828282" />
                </TouchableOpacity> 
            </View>

            <View style = {{ marginTop: RFValue(20), height:"10%", width: "79%"}}> 
                <Text style={styles.NewListText}>New List</Text>
            </View>
            
            <View style = {{ marginTop: RFValue(8), height:"4%", width: "78%", borderWidth:0}}> 
                <Text style={styles.ListNameLabel}>Name</Text>
            </View>

            <View style = {{ marginTop: RFValue(0), height:"8%", width: "80%", borderWidth:0}}> 
                <TextInput
                    style={styles.ListNameInput}
                    placeholder="Hoodat Buds"
                />
            </View>

            <View style = {{ marginTop: RFValue(8), height:"4%", width: "78%", borderWidth:0}}> 
                <Text style={styles.ListColorLabels}>Color</Text>
            </View>

            <View style = {{  marginTop: RFValue(13), marginLeft: -15, height:"20%", width: "78%", borderWidth:0}}> 
                <SelectableGrid
                    data={colorData}
                    //ref={(ref) => {selectedColor = ref;}}
                    onSelect={selectedData => ( selectedColor=selectedData)}
                    maxPerRow={4}
                    unselectedRender={data => (
                        <View style={{ borderRadius:10, width:"100%",  height:"100%" ,backgroundColor: data.backgroundListColor}}>
                        </View>
                      )}
                      selectedRender={data => (
                        <View style={{ borderRadius:10, width:"100%",  height:"100%" ,backgroundColor: data.backgroundListColor, alignItems:"center", justifyContent:"center"}}>
                            <Icon  style={{paddingTop:1.5}}name="check" size={45} color="#494949"/>
                        </View>
                      )}
                    unselectedStyle = {styles.unselectedColorBoxes}
                    selectedStyle = {styles.selectedColorBoxes}
                />
            </View>
            
            

            <View style = {styles.createListButtonView}> 
                <TouchableOpacity
                    onPress={() => alert(selectedColor)}            // key for color stored in "selectedColor" variable
                    style={[styles.AddListButton, { flexDirection: "row" }]}
                >
                <Icon
                    name="plus"
                    size={30}
                    color="#FFFFFF"
                    style={styles.AddListIcon}
                />
                <Text style={styles.AddListText}>Create List</Text>
                </TouchableOpacity>
            </View>

            
        </View>
        
    );
  }
}

const styles = StyleSheet.create({
  
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
    },

    NewListText: {
        paddingVertical: RFValue(7), 
        fontSize: RFValue(32),
        fontWeight: "800",
    },

    ListNameLabel: {
        paddingVertical: RFValue(7), 
        fontSize: RFValue(16),
        fontWeight: "600",
        color: "#5F5F5F",
      },

    ListNameInput: {
        borderBottomWidth: 1,
        borderColor: "#C4C4C4",
        backgroundColor: "white",
        paddingVertical: RFValue(8),
        margin: 7,
        width: "100%",
        color: "#000000",
        overflow: "hidden",
      },
    
    ListColorLabels: {
        paddingVertical: RFValue(7), 
        fontSize: RFValue(16),
        fontWeight: "600",
        color: "#5F5F5F",
    },

    unselectedColorBoxes: {
        borderRadius: 10,
        marginTop:0,
        marginRight:12,
        marginLeft:12,
        marginBottom:12,
    },

    selectedColorBoxes: {
        borderWidth: 3,
        borderRadius: 10,
        marginTop:-3,
        marginRight:9,
        marginLeft:9,
        marginBottom:9,
    },

    createListButtonView:
    { 
        position:"absolute", 
        bottom: "12%", 
        flex:1, 
        flexDirection: "row", 
        width: "80%", 
        borderWidth:0, 
        justifyContent:'flex-end'
    },

    AddListButton: {
        backgroundColor: "#6EA8FF",
        width: 180,
        height: 60,
        borderRadius: 43,
        
    },

    AddListIcon: {
        marginLeft: 12,
        marginTop: 14,
    },

    AddListText: {
        marginTop: 18,
        marginLeft: 3,
        fontWeight: "800",
        color: "#FFFFFF",
        fontSize: RFValue(20),
    },

});

export default AddList;
