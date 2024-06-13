import dashboardDataReducer, {
  fetchPopularMovies,
} from '../src/reduxToolkit/slice/dashboardData'; // Adjust the path
import {axiosClient} from '../src/api/axios';
import {GenericListWrapper, PopularMovies} from '../src/reduxToolkit/types';

jest.mock('api/axios');
const mockedAxios = axiosClient as jest.Mocked<typeof axiosClient>;

describe('dashboardDataSlice', () => {
  const initialState = {
    movieResults: [] as PopularMovies[],
    loading: false,
  };

  it('should handle initial state', () => {
    expect(dashboardDataReducer(undefined, {type: 'unknown'})).toEqual(
      initialState,
    );
  });

  it('should handle fetchPopularMovies.pending', () => {
    const action = {type: fetchPopularMovies.pending.type};
    const state = dashboardDataReducer(initialState, action);
    expect(state).toEqual({
      movieResults: [],
      loading: true,
    });
  });

  it('should handle fetchPopularMovies.fulfilled', () => {
    const movieResults: PopularMovies[] = [
      {
        id: 1,
        title: 'Movie 1',
        adult: false,
        backdrop_path: '',
        genre_ids: [],
        original_language: '',
        original_title: '',
        overview: '',
        popularity: 0,
        poster_path: '',
        release_date: '',
        video: false,
        vote_average: 0,
        vote_count: 0,
      },
    ];
    const action = {
      type: fetchPopularMovies.fulfilled.type,
      payload: {results: movieResults},
    };
    const state = dashboardDataReducer(initialState, action);
    expect(state).toEqual({
      movieResults: movieResults,
      loading: false,
    });
  });

  it('should handle fetchPopularMovies.rejected', () => {
    const action = {type: fetchPopularMovies.rejected.type};
    const state = dashboardDataReducer(initialState, action);
    expect(state).toEqual({
      movieResults: [],
      loading: false,
    });
  });

  it('fetchPopularMovies asyncThunk', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    const response: GenericListWrapper<PopularMovies> = {
      results: [
        {
          id: 1,
          title: 'Movie 1',
          adult: false,
          backdrop_path: '',
          genre_ids: [],
          original_language: '',
          original_title: '',
          overview: '',
          popularity: 0,
          poster_path: '',
          release_date: '',
          video: false,
          vote_average: 0,
          vote_count: 0,
        },
      ],
      page: 0,
      total_pages: 0,
      total_results: 0,
    };
    mockedAxios.get.mockResolvedValueOnce(response);

    await fetchPopularMovies('en')(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(
      fetchPopularMovies.pending(expect.anything(), expect.anything()),
    );
    expect(dispatch).toHaveBeenCalledWith(
      fetchPopularMovies.fulfilled(response, expect.anything(), 'en'),
    );
  });

  it('fetchPopularMovies asyncThunk failure', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    await fetchPopularMovies('en')(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(
      fetchPopularMovies.pending('', expect.anything()),
    );
    expect(dispatch).toHaveBeenCalledWith(
      fetchPopularMovies.rejected(expect.anything(), expect.anything(), 'en'),
    );
  });
});
