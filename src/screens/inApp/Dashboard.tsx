import {View, StyleSheet, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '@reduxToolkit/index';
import {fetchPopularMovies} from '@reduxToolkit/slice/dashboardData';
import {PopularMovies} from '@reduxToolkit/types';
import {Card, Text} from 'react-native-paper';
import i18n from '../../../i18n';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const movieResults = useAppSelector(
    state => state.dashboardData?.movieResults,
  );
  useEffect(() => {
    dispatch(fetchPopularMovies(i18n.language));
  }, [dispatch]);

  return (
    <FlatList
      data={movieResults}
      keyExtractor={(item: PopularMovies) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      initialNumToRender={10}
      onEndReachedThreshold={0.6}
      renderItem={({item}) => (
        <View style={styles.item}>
          <Card.Cover
            source={{
              uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path,
            }}
            style={styles.image}
          />
          <Text numberOfLines={2} style={styles.title}>
            {item.title}
          </Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flex: 1,
    gap: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 25,
  },
  title: {
    fontSize: 12,
    fontWeight: 900,
    flexWrap: 'wrap',
    flexGrow: 1,
    alignItems: 'flex-start',
    width: '50%',
  },
});

export default Dashboard;
