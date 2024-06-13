// Dashboard.test.tsx

import React from 'react';
import {render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import Dashboard from './Dashboard';

const mockStore = configureStore();

const mockState = {
  dashboardData: {
    movieResults: [
      {
        id: 1,
        title: 'Movie Title 1',
        poster_path: '/path/to/poster1.jpg',
      },
      {
        id: 2,
        title: 'Movie Title 2',
        poster_path: '/path/to/poster2.jpg',
      },
    ],
  },
};

const store = mockStore(mockState);

describe('Dashboard', () => {
  it('renders correctly and matches snapshot', () => {
    const {toJSON} = render(
      <Provider store={store}>
        <Dashboard />
      </Provider>,
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
