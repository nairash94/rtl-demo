import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Pressable, TextInputProps} from 'react-native';
import {styled} from 'styled-components/native';

const InputMainContainer = styled.View`
  margin-bottom: 16px;
  min-width: 120px;
`;

const InputLabel = styled.Text`
  color: '#333';
  font-weight: 700;
  font-size: 14px;
  font-style: normal;
  line-height: 20px;
  flex: 1;
`;

const PressableView = styled.View`
  flex: 0 1 auto;
`;

const InputField = styled.TextInput`
  height: 28px;
  padding: 0 2px;
  border-bottom-width: 1px;
  border-bottom-color: gray;
  font-size: 16px;
  line-height: 24px;
  background-color: '#FFF';
  color: '#333';
`;

export interface InputProps extends TextInputProps {
  placeholder: string;
  disabled?: boolean;
  label?: string;
  onPress?: () => void;
}

const Input = ({
  placeholder,
  disabled,
  label,
  onPress,
  value,
  maxLength,
  onBlur,
  ...rest
}: InputProps) => {
  const [focus, setFocus] = useState<boolean>(false);
  const triggerFocus = () => setFocus(true);
  const triggerBlur = () => setFocus(false);

  return (
    <InputMainContainer>
      {!!label && <InputLabel>{label}</InputLabel>}
      <PressableView>
        <Pressable onPress={onPress}>
          <InputField
            style={[focus ? styles.focus : null, {color: '#333333'}]}
            placeholder={placeholder}
            onFocus={triggerFocus}
            onBlur={e => {
              triggerBlur();
              onBlur?.(e);
            }}
            editable={!disabled}
            value={value}
            maxLength={maxLength}
            placeholderTextColor={'#AFB9C3'}
            {...rest}
          />
        </Pressable>
      </PressableView>
    </InputMainContainer>
  );
};

const styles = StyleSheet.create({
  focus: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    padding: 0,
  },
  disabledInput: {
    backgroundColor: '#E0E0E0',
  },
  rightIconContainerStyle: {
    right: 0,
    zIndex: 9,
  },
});

export default Input;
