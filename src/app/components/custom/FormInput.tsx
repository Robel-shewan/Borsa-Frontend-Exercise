import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { FormInputProps } from '../../../types/customComponent';

const FormInput: React.FC<FormInputProps> = ({
  label,
  onChangeText,
  onBlur,
  value,
  placeholder,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
});

export default FormInput;
