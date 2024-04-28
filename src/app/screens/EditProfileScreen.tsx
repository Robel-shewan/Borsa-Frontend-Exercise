import React, { useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { selectIsUpdateSuccess, selectUser } from './User/slice/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileEditValidationSchema } from '../../utils/validation';
import { actions } from './User/slice';
import { IEditUserRequestParse } from './User/slice/types';
import { useNavigation } from '@react-navigation/native';

const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation();

  const user = useSelector(selectUser);
  const isUpdateSuccess = useSelector(selectIsUpdateSuccess);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isUpdateSuccess) {
      dispatch(actions.getUser(user?._id));
      navigation.navigate('UserDetail'); // Navigate to EditProfile screen
    }
  }, [isUpdateSuccess]);

  const parseRequestBody = (values: IEditUserRequestParse) => {
    const requestBody: IEditUserRequestParse = {};
    if (values.firstName !== user.firstName)
      requestBody.firstName = values.firstName;
    if (values.lastName !== user.lastName)
      requestBody.lastName = values.lastName;
    if (values.email !== user.email) requestBody.email = values.email;
    return requestBody;
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
        }}
        onSubmit={values => {
          const payload = { _id: user?._id, ...parseRequestBody(values) };

          dispatch(actions.updateUser(payload));
        }}
        validationSchema={ProfileEditValidationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                value={values.firstName}
                placeholder="First Name"
              />
              {errors.firstName && touched.firstName && (
                <Text style={styles.error}>{errors.firstName}</Text>
              )}
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                value={values.lastName}
                placeholder="Last Name"
              />
              {errors.lastName && touched.lastName && (
                <Text style={styles.error}>{errors.lastName}</Text>
              )}
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="Email"
                keyboardType="email-address"
              />
              {errors.email && touched.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}
            </View>
            <Button
              onPress={handleSubmit}
              title="Submit"
              color="#007BFF"
              accessibilityLabel="Submit button"
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  form: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
});

export default EditProfileScreen;
