import {yupResolver} from '@hookform/resolvers/yup';
import {AuthStackScreenProps} from 'navigation/types';
import React, {useMemo, useState} from 'react';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import {Keyboard} from 'react-native';
import {useAppDispatch} from 'reduxToolkit';
import {setAuthenticated} from '../../reduxToolkit/slice/userData';
import * as yup from 'yup';
import {FormInput} from '../../components/formInput';
import {Button, Snackbar, Text} from 'react-native-paper';
import styled from 'styled-components/native';
import {useTranslation} from 'react-i18next';
import {TFunction} from 'i18next';

const loginSchema = (t: TFunction<'translations', undefined>) => {
  return yup.object({
    email: yup.string().required(t('cred_required')).email(t('email_invalid')),
    password: yup
      .string()
      .required(t('cred_required'))
      .matches(/^(?=.*[A-Z])(?=.*[^a-zA-Z0-9 ]).{8,15}$/, t('password_poilcy'))
      .max(15, t('password_max_length')),
  });
};

const ParentView = styled.View`
  justify-content: space-between;
  flex: 1;
`;

const CredentialsView = styled.View`
  gap: 20px;
  padding: 0 20px;
  margin-top: 15px;
`;

const ButtonContainer = styled.View`
  padding: 20px;
`;

export type LoginFormValues = yup.InferType<ReturnType<typeof loginSchema>>;

const LoginScreen = ({}: AuthStackScreenProps<'LoginScreen'>) => {
  const {t} = useTranslation();
  const scheme = useMemo(() => loginSchema(t), [t]);
  const {...methods} = useForm({
    resolver: yupResolver<LoginFormValues>(scheme),
  });
  const dispatch = useAppDispatch();
  const [isPasswordSecure] = useState(true);
  const [snackbar, setSnackbar] = React.useState<{
    visible: boolean;
    text?: string | undefined;
  }>({
    visible: false,
    text: undefined,
  });
  const onDismissSnackBar = () => setSnackbar({visible: false});

  const onSubmit: SubmitHandler<LoginFormValues> = data => {
    Keyboard.dismiss();
    dispatch(setAuthenticated(data.email));
  };
  const onError: SubmitErrorHandler<LoginFormValues> = errors => {
    Keyboard.dismiss();
    setSnackbar({
      text: errors[Object.keys(errors)[0] as keyof typeof errors]
        ?.message as string,
      visible: true,
    });
  };

  return (
    <ParentView>
      <CredentialsView>
        <Text variant="titleMedium">{t('login_title')}</Text>
        <FormProvider {...methods}>
          <FormInput
            name="email"
            label={t('email_label')}
            maxLength={50}
            placeholder={t('email_placeholder')}
          />
          <FormInput
            name="password"
            label={t('pwd_label')}
            maxLength={20}
            placeholder={t('pwd_placeholder')}
            secureTextEntry={isPasswordSecure}
          />
        </FormProvider>
      </CredentialsView>
      <ButtonContainer>
        <Button
          mode="contained"
          disabled={!methods.formState.isDirty}
          onPress={methods.handleSubmit(onSubmit, onError)}>
          Login
        </Button>
      </ButtonContainer>
      <Snackbar
        visible={snackbar.visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: t('Ok_text'),
          onPress: onDismissSnackBar,
        }}
        duration={3000}>
        {snackbar.text}
      </Snackbar>
    </ParentView>
  );
};

export default LoginScreen;
