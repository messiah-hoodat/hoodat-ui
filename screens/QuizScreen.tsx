import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { RFValue } from "react-native-responsive-fontsize";
import CircularTimer from "react-native-circular-timer";
import { Contact } from "./myListsScreen";
import { QuestionResult } from "./QuizResultsScreen";
import { ReloadInstructions } from "react-native/Libraries/NewAppScreen";

interface QuestionOption {
  contact: Contact;
  isCorrect: boolean;
}

interface Props {
  navigation: any;
  route: {
    params: {
      contacts: Contact[];
      questionResults: QuestionResult[];
      QuizTitleListName: string;
      CurrentQuizQuestionNumber: number;
    };
  };
}

class QuizScreen extends React.Component<Props> {

  _restartTimer = () => {
    if (this._timerRef) this._timerRef.restart();
  };

  render() {
    const screenWidth = Math.round(Dimensions.get("window").width);
    const { QuizTitleListName, contacts } = this.props.route.params;
    var { CurrentQuizQuestionNumber } = this.props.route.params;
    var questionResults = this.props.route.params.questionResults ?? [];
    var QuizTotalNumberOfQuestions = contacts.length;
    CurrentQuizQuestionNumber = CurrentQuizQuestionNumber + 1;
    var ProgressBarWidth =
      (CurrentQuizQuestionNumber / QuizTotalNumberOfQuestions) * screenWidth;
    var TotalQuizTime = QuizTotalNumberOfQuestions * 10;

    const correctContactIndex = CurrentQuizQuestionNumber - 1;
    const correctContact = contacts[correctContactIndex];

    const getUniqueRandomOptions = (): QuestionOption[] => {
      let options: QuestionOption[] = [];
      let indeces: number[] = [];
      for (let i = 0; i < contacts.length; i++) {
        if (!(i === correctContactIndex)) {
          indeces.push(i);
        }
      }
      const randomIndeces = indeces.sort(() => 0.5 - Math.random());
      for (let i = 0; i < 4; i++) {
        options[i] = {
          contact: contacts[randomIndeces[i]],
          isCorrect: false
        };
      }

      return options;
    }

    
    // Initialize options with random contacts
    const questionOptions = getUniqueRandomOptions();

    // Insert correct option at random position
    const correctIndex = Math.floor(Math.random() * 4);
    questionOptions[correctIndex] = {
      contact: correctContact,
      isCorrect: true
    };

    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 0,
            flexDirection: "row",
            marginTop: RFValue(70),
            width: "80%",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.QuizTitleListNameStyling}>
            {QuizTitleListName}
          </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Hoodat Buds")}
          >
            <Icon name="cross" size={25} color="#636363" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            marginTop: RFValue(50),
            width: "80%",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 3.5,
              marginTop: RFValue(0),
              width: "125%",
              alignItems: "center",
            }}
          >
            <CircularTimer
              ref={refs => (this._timerRef = refs)}
              seconds={10}
              radius={RFValue(37)}
              borderWidth={RFValue(6)}
              borderBackgroundColor={"#DDDDDD"}
              borderColor={"#FFB906"}
              onTimeElapsed={() => {
                if (CurrentQuizQuestionNumber != QuizTotalNumberOfQuestions){
                  this._restartTimer();
                  questionResults.push({
                    contact: correctContact,
                    correct: false,
                  });
                  this.props.navigation.navigate("Quiz Screen", {
                    questionResults,
                    CurrentQuizQuestionNumber: CurrentQuizQuestionNumber,
                  });
                  }
              }}
            />
            <Text style={styles.HooIsText}>Hoo is...</Text>
            <Text style={styles.QuizPersonName}>{correctContact.name}</Text>
          </View>

          <View style={{ flex: 5.5, width: "87%" }}>
            {
              (() => {
                const wrapper = (children: any) =>
                  <View
                    style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: RFValue(5) }}
                  >
                    {children}
                  </View>

                const option = (index: number) =>
                  <TouchableOpacity
                    onPress={() => {
                      this._restartTimer();
                      questionResults.push({
                        contact: correctContact,
                        correct: questionOptions[index].isCorrect,
                      });
                      if (CurrentQuizQuestionNumber < QuizTotalNumberOfQuestions) {
                        this.props.navigation.navigate("Quiz Screen", {
                          questionResults,
                          CurrentQuizQuestionNumber: CurrentQuizQuestionNumber,
                        });
                      } else {
                        this.props.navigation.navigate("Quiz Results Screen", {
                          questionResults,
                          CurrentQuizQuestionNumber: CurrentQuizQuestionNumber,
                          restart: this._restartTimer
                        });
                      }
                    }}
                    style={{
                      flex: 1,
                      borderRadius: 10,
                      borderWidth: 2,
                      marginRight: RFValue(5),
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      style={styles.QuizQuestionImage}
                      source={{
                        uri: `data:${questionOptions[index].contact.image.fileType};base64,${questionOptions[index].contact.image.data}`,
                      }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>

                return (
                  <View>
                    {
                      [wrapper([option(0), option(1)]), wrapper([option(2), option(3)])]
                    }
                  </View>
                );
              })()
            }
          </View>
          <View
            style={{
              flex: 1,
              marginTop: 0,
              width: "125%",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flex: 1,
                marginTop: 0,
                width: "80%",
                alignItems: "baseline",
                borderWidth: 0,
              }}
            >
              <Text style={styles.QuestionCounter}>
                Question {CurrentQuizQuestionNumber} of{" "}
                {QuizTotalNumberOfQuestions}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                marginTop: 0,
                width: "100%",
                borderWidth: 0,
                backgroundColor: "lightgrey",
              }}
            >
              <View
                style={{
                  width: ProgressBarWidth,
                  flex: 1,
                  backgroundColor: "#6EA8FF",
                  borderBottomRightRadius: 50,
                  borderTopRightRadius: 50,
                }}
              />
            </View>
          </View>
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

  QuizTitleListNameStyling: {
    fontWeight: "800",
    fontSize: RFValue(18),
    width: "85%",
    color: "#494949",
  },
  HooIsText: {
    marginTop: "8%",
    fontWeight: "700",
    fontSize: RFValue(20),
    color: "#000000",
  },

  QuizPersonName: {
    marginTop: 3,
    fontWeight: "800",
    fontSize: RFValue(37),
    color: "#000000",
  },

  QuizQuestionImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },

  QuestionCounter: {
    fontSize: RFValue(14),
    fontWeight: "600",
  },

  QuizQuestionProgressBar: {
    width: 10,
    height: 100,
    backgroundColor: "#6EA8FF",
  },
});

export default QuizScreen;
