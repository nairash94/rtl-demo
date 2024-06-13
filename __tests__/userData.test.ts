import userDataReducer, {
  setAuthenticated,
  setUserLang,
  UserDataType,
} from '../src/reduxToolkit/slice/userData'; // Adjust the path

describe('userDataSlice', () => {
  const initialState: UserDataType = {
    isAuthenticated: false,
    language: 'en',
    email: undefined,
  };

  it('should handle initial state', () => {
    expect(userDataReducer(undefined, {type: 'unknown'})).toEqual(initialState);
  });

  it('should handle setAuthenticated', () => {
    const actual = userDataReducer(
      initialState,
      setAuthenticated('test@example.com'),
    );
    expect(actual.isAuthenticated).toEqual(true);
    expect(actual.email).toEqual('test@example.com');
  });

  it('should handle setUserLang', () => {
    const actual = userDataReducer(initialState, setUserLang('fr'));
    expect(actual.language).toEqual('fr');
  });
});
