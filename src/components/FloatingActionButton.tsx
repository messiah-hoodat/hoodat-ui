import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';

interface Props {
  icon: string;
  disabled?: boolean;
  label?: string;
  loading?: boolean;
  onPress?: () => any;
}

export default function FloatingActionButton({
  icon,
  disabled,
  label,
  loading,
  onPress,
}: Props) {
  return (
    <View style={styles.container}>
      <FAB
        accessibilityValue={label}
        color="white"
        disabled={disabled}
        focusable={true}
        icon={icon}
        label={label}
        loading={loading}
        onPress={onPress}
        style={disabled ? styles.disabled : styles.fab}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: RFValue(20),
    right: RFValue(20),
  },
  fab: {
    backgroundColor: '#6EA8FF',
  },
  disabled: {
    backgroundColor: '#B8D4FF',
  },
});
