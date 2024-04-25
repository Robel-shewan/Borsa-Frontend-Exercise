import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface User {
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  address: string;
  password: string;
  confirmPassword: string;
  isBuyer: boolean;
}

interface Props {
  user: User;
  onSubmit: (values: User) => void;
}

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  userName: Yup.string().required('Username is required'),
  address: Yup.string().required('Address is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  isBuyer: Yup.boolean().required('Please specify if you are a buyer or not'),
});

const EditScreen = () => {
  return <div></div>;
};

export default EditScreen;
