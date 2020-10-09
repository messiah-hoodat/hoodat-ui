import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { RFValue } from "react-native-responsive-fontsize";
import { ScrollView } from "react-native-gesture-handler";
import { Contact } from "./myListsScreen";

export interface QuestionResult {
  contact: Contact;
  correct: boolean;
}

interface Props {
  navigation: any;
  route: {
    params: {
      questionResults: QuestionResult[];
    };
  };
}

class QuizResultsScreen extends React.Component<Props> {
  render() {
    const { questionResults } = this.props.route.params;

    const correctCount = questionResults.filter((i) => i.correct).length;
    const questionsCount = questionResults.length;
    const correctPercentage = Math.round((correctCount / questionsCount) * 100);

    return (
      <View style={styles.container}>
        <View style={{ flex: 44, width: "100%", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Hoodat Buds")}
            style={styles.exitButton}
          >
            <Icon name="cross" size={30} color="#636363" />
          </TouchableOpacity>
          <Image
            style={styles.WoohooText}
            source={require("../assets/QuizResultsWoohooText.png")}
            resizeMode="contain"
          />

          <Image
            style={styles.QuizResultsScreenBackground}
            source={require("../assets/QuizResultsScreenBackground.png")}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            flex: 56,
            width: "100%",
            marginTop: RFValue(3),
            alignItems: "center",
            borderWidth: 0.5,
            backgroundColor: "#F0F6FF",
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          }}
        >
          <View style={{ width: "83%", alignItems: "center" }}>
            <Text style={styles.correctAnswersPercentageText}>
              {correctCount} of {questionsCount} correct ({correctPercentage}%)
            </Text>
          </View>
          <View style={styles.QuizResultsScrollViewViewWrapper}>
            <ScrollView style={styles.QuizResultsScrollView}>
              {questionResults.map((questionResult) => (
                <View style={styles.namesInQuizResultPage}>
                  <Image
                    style={styles.QuizResultsPagePersonImage}
                    source={{
                      uri: `data:${questionResult.contact.image.fileType};base64,${questionResult.contact.image.data}`,
                    }}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      color: questionResult.correct ? "green" : "red",
                      ...styles.namesInQuizResultPageText,
                    }}
                  >
                    {questionResult.contact.name}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>

          <TouchableOpacity>
            <Text
              onPress={() => this.props.navigation.navigate("Quiz Screen", {
                questionResults: [],
                CurrentQuizQuestionNumber: 0,
              })}
              style={styles.retakeQuizButton}
            >
              Retake Quiz
            </Text>
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

  exitButton: {
    marginTop: "15%",
    marginRight: "10%",
    alignSelf: "flex-end",
  },
  WoohooText: {
    height: "8%",
    marginLeft: "-10%",
    alignSelf: "flex-start",
  },

  QuizResultsScreenBackground: {
    padding: 10,
    //width: '80%',
    height: "65%",
  },
  correctAnswersPercentageText: {
    alignSelf: "flex-start",
    marginTop: "7%",
    fontWeight: "bold",
    fontSize: RFValue(13),
    color: "#777777",
  },
  QuizResultsScrollViewViewWrapper: {
    height: "65%",
    width: "85%",
    marginTop: RFValue(3),
    justifyContent: "center",
  },
  QuizResultsScrollView: {
    paddingVertical: RFValue(10),
    height: "100%",
    width: "100%",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    borderWidth: 0.5,
    //borderWidth:0,
  },
  namesInQuizResultPage: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "flex-start",
    paddingVertical: RFValue(10),
    paddingLeft: RFValue(20),
    marginBottom: RFValue(5),
  },
  QuizResultsPagePersonImage: {
    borderRadius: 100,
    width: RFValue(18),
    height: RFValue(18),
  },
  namesInQuizResultPageText: {
    fontSize: RFValue(14),
    fontWeight: "bold",
    paddingLeft: RFValue(20),
  },
  retakeQuizButton: {
    marginTop: "2%",
    paddingVertical: RFValue(15),
    width: RFValue(250),
    backgroundColor: "#6EA8FF",
    color: "white",
    textAlign: "center",
    fontWeight: "800",
    fontSize: RFValue(20),
    borderRadius: 20,
    overflow: "hidden",
  },
});

export default QuizResultsScreen;
