import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, Image, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import { Divider } from 'react-native-elements';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const UserSignUp: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignIn = () => {
    navigation.navigate('HostMap')
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View>
        <Image
          style={styles.logo}
          source={require('../../assets/Where-Logo')} // Ensure the correct path and extension
          onError={() => console.log('Error loading logo')} // Error handling for image loading
        />
      </View>

      {/* Header Text */}
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>Ready To Get Started?</Text>
        <Text style={styles.subHeaderText}>
          The weekend is coming! Make sure to be the first stop our users visit.
        </Text>
      </View>

      {/* Sign Up & Sign In */}
      <View style={styles.buttonContainer}>
        <Button
          icon="account-key"
          color="white"
          style={styles.returnButton}
          onPress={handleSignIn}
        >
          Sign In
        </Button>
        <Text style={{ color: 'white' }}>Don't have an account? Login</Text>
      </View>

      {/* OR Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.divider}></View>
        <Text style={{ color: 'white' }}>OR</Text>
        <View style={styles.divider}></View>
      </View>

      {/* Google and Other Login Forms */}
      <View style={styles.loginContainer}>
        <Button
          icon="google"
          color="white"
          style={styles.googleButton}
          onPress={() => navigation.goBack()}
        >
          Continue with Google
        </Button>
        <Button
          icon="facebook"
          color="white"
          style={styles.facebookButton}
          onPress={() => navigation.goBack()}
        >
          Continue with Facebook
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#333333',
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 80,
  },
  logo: {
    top: -30,
    height: 70,
    width: 70,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 70,
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 10,
  },
  subHeaderText: {
    color: 'white',
    fontWeight: '300',
    fontSize: 14,
    textAlign: 'center',
  },
  input: {
    color: 'white',
    width: 250,
    height: 50,
    borderWidth: 2,
    borderColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  divider: {
    borderWidth: 2,
    borderColor: 'white',
    width: '40%',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
    gap: 10,
  },
  returnButton: {
    backgroundColor: 'black',
    width: 200,
  },
  buttonContainer: {
    top: 40,
    gap: 20,
    flexDirection: 'column',
    marginBottom: 20,
  },
  loginContainer: {
    gap: 20,
    flexDirection: 'column',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  googleButton: {
    backgroundColor: '#D82E32',
  },
  facebookButton: {
    backgroundColor: '#395498',
  },
});

export default UserSignUp;
