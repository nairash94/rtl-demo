import MainStack from './navigation/AppNavigator';
import React from 'react';
import {StatusBar} from 'react-native';
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {store} from './reduxToolkit';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// LogBox.ignoreLogs(['to contain units']);

const toastConfig = {
  success: (props: BaseToastProps) => <BaseToast {...props} />,
  error: (props: BaseToastProps) => <ErrorToast {...props} />,
};

function App(): React.JSX.Element {
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <StatusBar />
          <MainStack />
          <Toast config={toastConfig} position="bottom" />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
