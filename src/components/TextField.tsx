import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardTypeOptions,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

interface Props {
  errorMessage?: string;
  keyboardType?: KeyboardTypeOptions;
  label?: string;
  onChangeText?: (newVal: string) => any;
  placeholder?: string;
  secureTextEntry?: boolean;
}

export default function TextField(props: Props) {
  const error: boolean = !!props.errorMessage;
  return (
    <View style={styles.container}>
      <Text
        style={[styles.label, !!props.errorMessage ? styles.errorMessage : {}]}
      >
        {!!props.errorMessage ? props.errorMessage : props.label}
      </Text>

      <TextInput
        keyboardType={props.keyboardType}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        secureTextEntry={props.secureTextEntry}
        style={[styles.textInput, props.errorMessage ? styles.error : {}]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
  },
  label: {
    marginTop: RFValue(25),
    fontSize: RFValue(14),
    fontWeight: '600',
    color: '#5F5F5F',
  },
  errorMessage: {
    marginTop: RFValue(25),
    fontSize: RFValue(14),
    fontWeight: '600',
    color: 'red',
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: '#C4C4C4',
    backgroundColor: 'white',
    paddingVertical: 8,
    marginVertical: 7,
    overflow: 'hidden',
  },
  error: {
    borderColor: 'red',
  },
});
