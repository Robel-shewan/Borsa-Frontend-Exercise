import * as Yup from 'yup';

// Creating a Yup schema based on the IUserModel interface
export const userValidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('Full Name is required')
    .max(50, 'First name cannot be more than 50 characters long'),
  email: Yup.string()
    .required('Email is required')
    .email('Email must be a valid email address'),
  userName: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters long')
    .max(30, 'Username cannot be more than 30 characters long'),

  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),

  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),

  address: Yup.string().required('Address is required'),
  profilePic: Yup.string()
    .url('Profile picture must be a valid URL')
    .notRequired(), // This field is optional
  isBuyer: Yup.boolean().required('User type (isBuyer) is required'),
});

export const userLoginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Email must be a valid email address'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
});
