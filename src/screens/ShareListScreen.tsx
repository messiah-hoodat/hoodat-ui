import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ScreenTitle, TextField, FAB } from '../components';
import Icon from 'react-native-vector-icons/Entypo';
import { RFValue } from 'react-native-responsive-fontsize';
import HoodatService from '../services/HoodatService';
import { UserContext } from '../contexts/UserContext';

interface Props {
  navigation: any;
  route: {
    params: {
      listId: string;
    };
  };
}

export default function ShareListScreen({ navigation, route }: Props) {
  const context = useContext(UserContext);

  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState('');


  const handleSubmit = async () => {
    setSubmitting(true);

    const { token, userId } = context!.value;

    const listId = route.params.listId;

    try {
      await HoodatService.addViewerToList(listId, email, token);
      Alert.alert('Successfully shared list!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Uh oh!', error.toString());
    }

    setSubmitting(false);
    return Promise.resolve();
  }

  return (
    <View style={styles.container}>
      <View style={{ marginTop: RFValue(65), width: '80%' }}>
        <TouchableOpacity>
          <Icon name="chevron-thin-left" size={25} color="#828282" onPress={navigation.goBack} />
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: RFValue(20), width: '80%' }}>
        <ScreenTitle title="Share List" />
      </View>

      <View style={{ width: '80%', borderWidth: 0 }}>
        <TextField
          label="Email"
          onChangeText={(email: string) => setEmail(email)}
          placeholder="example@gmail.com"
        />
      </View>

      <FAB
        disabled={submitting}
        icon="plus"
        label="Share list"
        loading={submitting}
        onPress={() => handleSubmit()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
});