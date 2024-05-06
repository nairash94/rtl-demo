import React from 'react';
import {
  UseControllerProps,
  useController,
  useFormContext,
} from 'react-hook-form';
// import Input, {InputProps} from './input';
import {TextInput, TextInputProps} from 'react-native-paper';

interface FormInputProps extends TextInputProps, UseControllerProps {
  defaultValue?: string;
}

const ControlledInput = (props: FormInputProps) => {
  const {name, rules, defaultValue, onChangeText, ...inputProps} = props;

  const {field} = useController({name, rules, defaultValue});

  return (
    // <Input
    //   onChangeText={(input: any) => {
    //     onChangeText?.(input);
    //     field.onChange(input);
    //   }}
    //   value={field.value ?? ''}
    //   {...inputProps}
    // />
    <TextInput
      label="Email"
      value={field.value}
      onChangeText={(input: any) => {
        onChangeText?.(input);
        field.onChange(input);
      }}
      mode="outlined"
      {...inputProps}
    />
  );
};

export const FormInput = (props: FormInputProps) => {
  const {name} = props;
  const formContext = useFormContext();
  if (!formContext || !name) {
    const msg = !formContext
      ? 'FormInput must be wrapped by the FormProvider'
      : 'Name must be defined for FormInput component';
    console.error(msg);
    return null;
  }

  return <ControlledInput {...props} />;
};
