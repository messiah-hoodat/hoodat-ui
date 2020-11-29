import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Keyboard,
  StyleSheet,
  TextInput,
  UIManager,
} from 'react-native';

const { State: TextInputState } = TextInput;

interface Props {
  children: () => any;
}

interface State {
  shift: Animated.Value;
}

/**
 * KeyboardShift
 *
 * A wrapper component that enables the screen to shift
 * when the on-screen keyboard blocks a TextInput.
 *
 * Article: https://codeburst.io/react-native-keyboard-covering-inputs-72a9d3072689
 * Example: https://github.com/larkintuckerllc/hello-react-native-keyboard
 */
export default class KeyboardShift extends Component<Props, State> {
  private keyboardDidShowSub: any;
  private keyboardDidHideSub: any;

  constructor(props: Props) {
    super(props);

    this.state = { shift: new Animated.Value(0) };
  }

  componentDidMount() {
    this.keyboardDidShowSub = Keyboard.addListener(
      'keyboardDidShow',
      this.handleKeyboardDidShow
    );
    this.keyboardDidHideSub = Keyboard.addListener(
      'keyboardDidHide',
      this.handleKeyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  render() {
    const { children: renderProp } = this.props;
    const { shift } = this.state;
    return (
      <Animated.View
        style={[styles.container, { transform: [{ translateY: shift }] }]}
      >
        {renderProp()}
      </Animated.View>
    );
  }

  handleKeyboardDidShow = (event: any) => {
    const { height: windowHeight } = Dimensions.get('window');
    const keyboardHeight = event.endCoordinates.height;
    const currentlyFocusedField = TextInputState.currentlyFocusedField();
    UIManager.measure(
      currentlyFocusedField,
      (originX, originY, width, height, pageX, pageY) => {
        const fieldHeight = height;
        const fieldTop = pageY;
        const gap = windowHeight - keyboardHeight - (fieldTop + fieldHeight);
        if (gap >= 0) {
          return;
        }
        Animated.timing(this.state.shift, {
          toValue: gap,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    );
  };

  handleKeyboardDidHide = () => {
    Animated.timing(this.state.shift, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: 'white',
  },
});
