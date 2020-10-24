import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { RFValue } from "react-native-responsive-fontsize";
import { List } from "../screens/TestMultipleList";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';

interface Props {
  list: List,
}

export default function MultipleListsCard({ list }: Props) {
    var color1 = "";
    var color2 = "";

    if      (list.color==0)     {color1 = "#B3A7FF"; color2 = "#f3b6c9";}   // 0.       dark purple
    else if (list.color==1)     {color1 = "#FFA7D1"; color2 = "#f3b6c9";}   // 1.       light pink
    else if (list.color==2)     {color1 = "#FFACA7"; color2 = "#E8B6F3";}   // 2.       dark pink
    else if (list.color==3)     {color1 = "#A7FFB0"; color2 = "#A7ECFF";}   // 3.       pastel green
    else if (list.color==4)     {color1 = "#FFE2AB"; color2 = "#FFBC7C";}   // 4.       orange/peach -
    else if (list.color==5)     {color1 = "#A7F4FF"; color2 = "#A7AEFF";}   // 5.       light blue
    else if (list.color==6)     {color1 = "#FFB4E1"; color2 = "#E16AFF";}   // 6.       light purple - 
    else if (list.color==7)     {color1 = "#E3FFA7"; color2 = "#A7DEFF";}   // 7.       light green
    else                        {color1 = "#FFE2AB"; color2 = "#FFBC7C";}   // else.    orange/peach -

    const navigation = useNavigation();
    const listName = list.name;
  return (
        
        <TouchableOpacity
            onPress={() =>
                navigation.navigate("Hoodat Buds", {
                contacts: list.contacts,
                listName,
                //fetchLists: this.fetchLists,
                })
            }>
            <LinearGradient
            colors={[color1, color2]}
            style={styles.ListButton}
            start={{ x: -0.2, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            >
                <Text style={styles.ListButtonTitle}>{list.name}</Text>
                <Text style={styles.ListButtonSubtitle}>
                    {list.contacts.length} contacts
                </Text>
                <ScrollView
                    style={styles.ListButtonImageScroll}
                    horizontal={true}
                >
                    {list.contacts.map((contact: any) => (
                    <Image
                        style={styles.ListButtonContactImage}
                        source={{
                        uri: `data:${contact.image.fileType};base64,${contact.image.data}`,
                        }}
                        resizeMode="contain"
                    />
                    ))}
                </ScrollView>
            </LinearGradient>
        </TouchableOpacity>

  );
}

const styles = StyleSheet.create({

    ListButton: {
        marginTop:15,
        width: "100%",
        height: 140,
        borderRadius: 25,
        marginBottom:15,
    },

    ListButtonTitle: {
        marginTop: 20,
        marginLeft: 25,
        color: "#494949",
        fontWeight: "800",
        fontSize: 20,
    },
    
    ListButtonSubtitle: {
    marginTop: 10,
    marginLeft: 27,
    color: "#494949",
    fontWeight: "500",
    fontSize: 14,
    },

    ListButtonImageScroll: {
        marginTop: 15,
        marginLeft: 26,
        width: 300,
    },

    ListButtonContactImage: {
    width: 42,
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 12,
    borderColor: "lightgrey",
    },

  PeopleInListName: {
    fontWeight: "bold",
    textAlignVertical: "center",
    fontSize: 18,
    color: "#494949",
  },
});