import { TextInputProps } from 'react-native';

export interface FormInputProps extends TextInputProps {
  label: string;
  onChangeText: (text: string) => void;
  value: string | undefined;
  placeholder: string;
}
