import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { lightTheme } from '../../utils/theme/lightTheme';
import Icon from 'react-native-vector-icons/Feather';

export default function LoginScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="arrow-left" size={20} color="black" />
            {/* <ArrowLeftIcon size={20} color="black" /> */}
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/loginimg.png')}
            style={styles.image}
          />
        </View>
      </SafeAreaView>
      <View style={styles.formContainer}>
        <View style={styles.form}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput style={styles.input} placeholder="Email" />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="Password"
          />
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.orText}>Or</Text>
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require('../../assets/images/google.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={[styles.signUpText, styles.signUpLink]}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.colors.primary,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  backButton: {
    padding: 10,
    borderRadius: 20,
    marginLeft: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: 220,
    height: 200,
  },
  formContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  form: {
    marginBottom: 20,
  },
  label: {
    color: 'gray',
    marginLeft: 20,
  },
  input: {
    padding: 20,
    backgroundColor: '#E5E7EB',
    color: 'gray',
    borderRadius: 20,
    marginBottom: 10,
  },
  forgotPassword: {
    color: 'gray',
    marginBottom: 20,
    marginLeft: 20,
  },
  loginButton: {
    paddingVertical: 15,
    backgroundColor: '#3B82F6',
    borderRadius: 20,
  },
  loginText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  orText: {
    fontSize: 20,
    color: 'gray',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  socialButton: {
    padding: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 20,
  },
  socialIcon: {
    width: 40,
    height: 40,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signUpText: {
    color: 'gray',
    fontWeight: 'bold',
  },
  signUpLink: {
    color: '#3B82F6',
  },
});
