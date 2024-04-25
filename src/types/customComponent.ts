export interface FormInputProps {
  label: string;
  onChangeText: (text: string) => void;
  onBlur: () => void;
  value: string;
  placeholder: string;
}
