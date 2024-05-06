import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {axiosClient} from 'api/axios';
import {AxiosError} from 'axios';
import {GenericListWrapper, PopularMovies} from '../../reduxToolkit/types';

export type DashboardDataType = {
  movieResults: PopularMovies[];
  loading: boolean;
};
const initialState: DashboardDataType = {
  movieResults: [],
  loading: false,
};

export const fetchPopularMovies = createAsyncThunk<
  GenericListWrapper<PopularMovies>,
  string
>('fetchPopularMovies', async (language, {rejectWithValue}) => {
  try {
    const fetchPopularMoviesBackendResp = await axiosClient.get(
      `https://api.themoviedb.org/3/movie/popular?language=${language}&page=1`,
    );
    const fetchPopularMoviesResp =
      fetchPopularMoviesBackendResp.data as GenericListWrapper<PopularMovies>;

    return fetchPopularMoviesResp;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue('error');
    }
    return rejectWithValue('error');
  }
});

const dashboardDataSlice = createSlice({
  name: 'dashboard',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPopularMovies.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchPopularMovies.fulfilled, (state, action) => {
      state.movieResults = action.payload.results;
      state.loading = false;
    });
    builder.addCase(fetchPopularMovies.rejected, state => {
      state.loading = false;
    });
  },
});

export default dashboardDataSlice.reducer;
