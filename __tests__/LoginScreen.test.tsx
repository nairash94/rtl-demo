import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore, {MockStoreEnhanced} from 'redux-mock-store';
import {I18nextProvider} from 'react-i18next';
import i18n from '../i18n';
import LoginScreen from '../src/screens/login/Login';
import {Snackbar} from 'react-native-paper';
import {Store, UnknownAction} from '@reduxjs/toolkit';

jest.useFakeTimers();
// type DispatchExts = ThunkDispatch<State, void, Action>;
// const middlewares = [reduxThunk];
const mockStore = configureStore();

// Mock the Snackbar component
jest.mock('react-native-paper', () => {
  const actual = jest.requireActual('react-native-paper');
  return {
    ...actual,
    Snackbar: jest.fn(({visible, children}) => (visible ? children : null)),
  };
});

describe('LoginScreen', () => {
  let store:
    | Store<unknown, UnknownAction, unknown>
    | MockStoreEnhanced<unknown, {}>;

  beforeEach(() => {
    store = mockStore({
      // Provide initial state for your store
      userData: {isAuthenticated: false, language: 'en', email: undefined},
    });
  });
  // it('renders the login screen', () => {
  //   const {getByTestId} = render(
  //     <Provider store={store}>
  //       <I18nextProvider i18n={i18n}>
  //         <LoginScreen />
  //       </I18nextProvider>
  //     </Provider>,
  //   );
  //   expect(getByTestId('login_title')).toBeTruthy();
  //   expect(getByTestId('email_field')).toBeTruthy();
  //   expect(getByTestId('password_field')).toBeTruthy();
  // });

  it('displays validation errors when invalid input is provided', async () => {
    const {getByText, getByTestId} = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <LoginScreen />
        </I18nextProvider>
      </Provider>,
    );

    fireEvent.changeText(getByTestId('email_field'), 'invalid-email');
    fireEvent.changeText(getByTestId('password_field'), 'short');
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(Snackbar).toHaveBeenCalledWith(
        expect.objectContaining({
          visible: true,
          children: 'Please enter a valid email Id',
        }),
        {},
      );
    });
  });

  // it('successful login submission', async () => {
  //   const {getByText, getByTestId} = render(
  //     <Provider store={store}>
  //       <I18nextProvider i18n={i18n}>
  //         <LoginScreen />
  //       </I18nextProvider>
  //     </Provider>,
  //   );

  //   fireEvent.changeText(getByTestId('email_field'), 'test@example.com');
  //   fireEvent.changeText(getByTestId('password_field'), 'ValidPassword1!');
  //   fireEvent.press(getByText('Login'));

  //   await waitFor(() => {
  //     // const actions = store.getActions();
  //     // expect(actions).toBeDefined();
  //   });
  // });

  it('snackbar displays error message on form submission error', async () => {
    const {getByText, getByTestId} = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <LoginScreen />
        </I18nextProvider>
      </Provider>,
    );

    fireEvent.changeText(getByTestId('email_field'), 'test@example.com');
    fireEvent.changeText(getByTestId('password_field'), 'invalid');
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(Snackbar).toHaveBeenCalledWith(
        expect.objectContaining({
          visible: true,
          children:
            'Password must be 8 to 15 characters long, with at least 1 uppercase letter and 1 special character',
        }),
      );
    });
  });
});
