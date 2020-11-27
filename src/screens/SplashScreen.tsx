import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

interface Props {
  navigation: any;
}

class splashScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  async componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Sign In');
    }, 2000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.HoodatLogo}
          source={require('../../assets/HoodatTextLogo.png')}
          resizeMode="contain"
        />
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

  HoodatLogo: {
    marginTop: RFValue(300),
    width: RFValue(170),
  },
});
export default splashScreen;
