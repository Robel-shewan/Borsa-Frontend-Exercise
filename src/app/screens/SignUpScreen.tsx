import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  Switch,
  FlatList,
  Alert,
} from 'react-native';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { lightTheme } from '../../utils/theme/lightTheme';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/Feather';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import FormInput from '../components/custom/FormInput';
import { userValidationSchema } from './../../utils/validation';
import {
  CoordinateType,
  IUserModel,
  IUserRequestModel,
  userInitialValue,
} from '../models/user';
import { actions } from './User/slice';
import * as Permissions from 'expo-permissions';
import { useDispatch, useSelector } from 'react-redux';
import { selectIscreateAccount, selectUser } from './User/slice/selectors';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const isCreateAccount = useSelector(selectIscreateAccount);
  const user = useSelector(selectUser);
  const [location, setLocation] = useState<CoordinateType>(null);

  const dispatch = useDispatch();

  const handleSubmit = async () => {};

  function parseFullName(fullName: string) {
    // Split the full name by spaces
    const parts = fullName.trim().split(/\s+/);

    // If there's only one part, assume it's the first name
    if (parts.length === 1) {
      return { firstName: parts[0], lastName: '' };
    }

    // Otherwise, assume the last part is the last name
    const lastName = parts.pop();
    const firstName = parts.join(' '); // Join the remaining parts as the first name

    return { firstName, lastName };
  }

  // Request location permissions
  const requestLocationPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.log('Location permission not granted');
    }
  };

  // Get current location
  const getCurrentLocation = async () => {
    await requestLocationPermissions();

    const { coords } = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };

  useEffect(() => {
    if (isCreateAccount && user?.token) {
      navigation.navigate('Root');
    }
    // getCurrentLocation();
  }, [isCreateAccount, user]);

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
            source={require('../../assets/images/signupimg.png')}
            style={styles.image}
          />
        </View>
      </SafeAreaView>

      <Formik
        initialValues={userInitialValue}
        validationSchema={userValidationSchema}
        onSubmit={(values: IUserModel | IUserRequestModel) => {
          const { firstName, lastName } = parseFullName(values?.fullName);
          const { fullName, confirmPassword, ...restValues } = values;
          const updateObject = { ...restValues, firstName, lastName };
          dispatch(actions.createUser(updateObject as IUserModel));
          // navigation.navigate('Root');
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
          <View style={styles.container}>
            <View style={styles.formContainer}>
              <View style={styles.form}>
                <ScrollView>
                  <FormInput
                    label="Full Name"
                    onChangeText={handleChange('fullName')}
                    onBlur={handleBlur('fullName') as any}
                    value={values.fullName}
                    placeholder="Enter your full name"
                  />
                  {touched.fullName && errors.fullName && (
                    <Text style={styles.error}>{errors.fullName}</Text>
                  )}

                  <FormInput
                    label="UserName"
                    onChangeText={handleChange('userName')}
                    onBlur={handleBlur('userName')}
                    value={values.userName}
                    placeholder="Enter your userName"
                  />
                  {touched.userName && errors.userName && (
                    <Text style={styles.error}>{errors.userName}</Text>
                  )}

                  <FormInput
                    label="Email Address"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    placeholder="Enter Email Address"
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.error}>{errors.email}</Text>
                  )}

                  <FormInput
                    label="password"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry
                    placeholder="Enter Password"
                  />
                  {touched.password && errors.password && (
                    <Text style={styles.error}>{errors.password}</Text>
                  )}

                  <FormInput
                    label="confirmPassword"
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    secureTextEntry
                    placeholder="Enter Password"
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text style={styles.error}>{errors.confirmPassword}</Text>
                  )}

                  <FormInput
                    label="profile Pic"
                    onChangeText={handleChange('profilePic')}
                    onBlur={handleBlur('profilePic')}
                    value={values.profilePic}
                    placeholder="Enter profilePic uri"
                  />

                  {touched.profilePic && errors.profilePic && (
                    <Text style={styles.error}>{errors.profilePic}</Text>
                  )}

                  <View style={styles.checkboxContainer}>
                    <Text style={styles.checkboxLabel}>Are you a buyer?</Text>
                    {/* @ts-ignore */}
                    <Switch
                      style={styles.switch}
                      value={values.isBuyer}
                      onValueChange={value => setFieldValue('isBuyer', value)}
                    />
                  </View>

                  <FormInput
                    label="Address"
                    onChangeText={handleChange('address')}
                    onBlur={handleBlur('address')}
                    value={values.address}
                    placeholder="Enter Your Address"
                  />

                  {touched.address && errors.address && (
                    <Text style={styles.error}>{errors.address}</Text>
                  )}

                  {/* 
                  <Text style={styles.label}>Address</Text>
                  <GooglePlacesAutocomplete
                    placeholder="Type a place"
                    onPress={(data, details = null) => {
                      setFieldValue('address', details?.formatted_address);
                      console.log(data, details);
                    }}
                    query={{ key: 'API KEY' }}
                    fetchDetails={true}
                    onFail={error => console.log(error)}
                    onNotFound={() => console.log('no results')}
                    currentLocation={true}
                    currentLocationLabel="Your location!" // add a simple label
                  /> */}

                  <TouchableOpacity
                    style={[
                      styles.signUpButton,
                      isSubmitting && styles.disabled,
                    ]}
                    onPress={() => handleSubmit()}
                    // disabled={isSubmitting}
                  >
                    <Text style={styles.signUpText}>Sign Up</Text>
                  </TouchableOpacity>
                  <View style={styles.signInContainer}>
                    <Text style={styles.signInText}>
                      Already have an account?
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Login')}
                    >
                      <Text style={[styles.signInText, styles.signInLink]}>
                        {' '}
                        Login
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
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
    marginBottom: 60,
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
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 3,
  },
  checkboxLabel: {
    color: 'gray',
    marginLeft: 20,
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginLeft: 20,
    marginTop: -10,
  },
  image: {
    width: 325,
    height: 110,
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
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#E5E7EB',
    color: 'gray',
    borderRadius: 20,
    marginHorizontal: 10,
    marginTop: 4,
    marginBottom: 10,
  },
  signUpButton: {
    paddingVertical: 7,
    backgroundColor: '#3B82F6',
    borderRadius: 20,
  },
  signUpText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

  switch: {
    color: lightTheme.colors.primary,
  },

  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signInText: {
    color: 'gray',
    fontWeight: 'bold',
  },
  signInLink: {
    color: '#3B82F6',
  },
  disabled: {
    backgroundColor: 'gray',
  },
});
