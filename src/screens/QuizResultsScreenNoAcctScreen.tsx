import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { RFValue } from 'react-native-responsive-fontsize';
import Confetti from 'react-native-confetti';
import { OfflineContact } from './noAcctHelperFunctions';

export interface QuestionResult {
  contact: OfflineContact;
  correct: boolean;
}

interface Props {
  navigation: any;
  route: {
    params: {
      contacts: OfflineContact[];
      questionResults: QuestionResult[];
    };
  };
}

class QuizResultsScreen extends React.Component<Props> {
  private _confettiView: any;
  componentDidMount() {
    if (this._confettiView) {
      this._confettiView.startConfetti();
    }
  }

  componentWillUnmount() {
    if (this._confettiView) {
      this._confettiView.stopConfetti();
    }
  }

  render() {
    const { questionResults } = this.props.route.params;

    const correctCount = questionResults.filter((i) => i.correct).length;
    const questionsCount = questionResults.length;
    const correctPercentage = Math.round((correctCount / questionsCount) * 100);

    return (
      <View style={styles.container}>
        <View style={{ flex: 44, width: '100%', alignItems: 'center' }}>
          <Confetti ref={(node: any) => (this._confettiView = node)} />
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('List Details No Account')
            }
            style={styles.exitButton}
          >
            <Icon name="cross" size={30} color="#636363" />
          </TouchableOpacity>
          <Image
            style={styles.WoohooText}
            source={require('../../assets/QuizResultsWoohooText.png')}
            resizeMode="contain"
          />

          <Image
            style={styles.QuizResultsScreenBackground}
            source={require('../../assets/QuizResultsScreenBackground.png')}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            flex: 56,
            width: '100%',
            marginTop: RFValue(3),
            alignItems: 'center',
            backgroundColor: '#F0F6FF',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          }}
        >
          <View style={{ width: '83%', alignItems: 'center' }}>
            <Text style={styles.correctAnswersPercentageText}>
              {correctCount} of {questionsCount} correct ({correctPercentage}%)
            </Text>
          </View>
          <View style={styles.QuizResultsScrollViewViewWrapper}>
            <View style={styles.QuizResultsScrollView}>
              <FlatList
                data={questionResults}
                keyExtractor={(result) => result.contact.id}
                renderItem={({ item }) => (
                  <View style={styles.namesInQuizResultPage}>
                    <Image
                      style={styles.QuizResultsPagePersonImage}
                      source={{
                        uri: item.contact.uri,
                      }}
                      resizeMode="cover"
                    />
                    <Text
                      style={{
                        color: item.correct ? 'green' : 'red',
                        ...styles.namesInQuizResultPageText,
                      }}
                    >
                      {item.contact.name}
                    </Text>
                    <Icon
                      name={item.correct ? 'check' : 'cross'}
                      size={RFValue(14)}
                      color={item.correct ? 'green' : 'red'}
                    />
                  </View>
                )}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.retakeQuizButton}>
            <Text
              onPress={() => {
                this.props.navigation.navigate('Quiz No Account', {
                  questionResults: [],
                  CurrentQuizQuestionNumber: 0,
                });
              }}
              style={styles.retakeQuizText}
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
    backgroundColor: 'white',
    alignItems: 'center',
  },

  exitButton: {
    marginTop: '15%',
    marginRight: '10%',
    alignSelf: 'flex-end',
  },
  WoohooText: {
    height: '8%',
    marginLeft: '-10%',
    alignSelf: 'flex-start',
  },

  QuizResultsScreenBackground: {
    padding: 10,
    height: '65%',
  },
  correctAnswersPercentageText: {
    alignSelf: 'flex-start',
    marginTop: '7%',
    fontWeight: 'bold',
    fontSize: RFValue(13),
    color: '#777777',
  },
  QuizResultsScrollViewViewWrapper: {
    height: '65%',
    width: '85%',
    marginTop: RFValue(3),
    justifyContent: 'center',
  },
  QuizResultsScrollView: {
    paddingVertical: RFValue(10),
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  namesInQuizResultPage: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    paddingVertical: RFValue(10),
    paddingLeft: RFValue(20),
    marginBottom: RFValue(5),
  },
  QuizResultsPagePersonImage: {
    width: 42,
    height: 42,
    borderRadius: 13,
  },
  namesInQuizResultPageText: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
    paddingLeft: RFValue(20),
    marginRight: RFValue(5),
  },
  retakeQuizButton: {
    marginTop: '5%',
    paddingVertical: RFValue(15),
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6EA8FF',
    textAlign: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
  retakeQuizText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: RFValue(20),
  },
});

export default QuizResultsScreen;
