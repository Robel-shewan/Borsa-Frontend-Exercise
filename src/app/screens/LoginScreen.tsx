import React, { useEffect } from 'react';
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
import { Formik } from 'formik';
import FormInput from '../components/custom/FormInput';
import { ILogin, userLoginInitialValue } from '../models/user';
import { userLoginValidationSchema } from '../../utils/validation';
import { actions } from './User/slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLogin, selectUser } from './User/slice/selectors';

export default function LoginScreen() {
  const navigation = useNavigation();
  const user = useSelector(selectUser);
  const isLogin = useSelector(selectIsLogin);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogin && user?.token) {
      navigation.navigate('Root');
    }
  }, [isLogin, user]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="arrow-left" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/loginimg.png')}
            style={styles.image}
          />
        </View>
      </SafeAreaView>
      <Formik
        initialValues={userLoginInitialValue}
        validationSchema={userLoginValidationSchema}
        onSubmit={(values: ILogin) => {
          dispatch(actions.loginUser(values));
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          touched,
          errors,
          values,
          setFieldValue,
          isSubmitting,
        }) => (
          <View style={styles.formContainer}>
            <View style={styles.form}>
              <FormInput
                label="Email Address"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email') as any}
                value={values.email}
                placeholder="Enter Email Address"
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}

              <FormInput
                label="password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password') as any}
                value={values.password}
                secureTextEntry
                placeholder="Enter Password"
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}

              <TouchableOpacity>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={[styles.signUpText, styles.signUpLink]}>
                  {' '}
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
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
  error: {
    color: 'red',
    fontSize: 14,
    marginLeft: 20,
    marginTop: -10,
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
    marginTop: 5,
  },
  signUpText: {
    color: 'gray',
    fontWeight: 'bold',
  },
  signUpLink: {
    color: '#3B82F6',
  },
});
