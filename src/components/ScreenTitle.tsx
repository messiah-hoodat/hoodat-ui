import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

interface Props {
  title: string;
}

export default function ScreenTitle(props: Props) {
  return (
    <View>
      <Text style={styles.titleText}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: RFValue(32),
    fontWeight: 'bold',
  },
});
