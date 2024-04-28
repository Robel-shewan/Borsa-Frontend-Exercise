import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllUsers,
  selectHasMore,
  selectIsLogin,
  selectPage,
  selectUser,
} from './User/slice/selectors';
import { actions } from './User/slice';
import { ActivityIndicator } from 'react-native';

const HomeScreen = () => {
  const user = useSelector(selectUser);
  const users = useSelector(selectAllUsers);
  const isLogin = useSelector(selectIsLogin);
  const isLoading = useSelector(selectIsLogin);
  const page = useSelector(selectPage);

  const hasMore = useSelector(selectHasMore);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!users.length) dispatch(actions.getAllUsers({ page, limit: 10 }));
  }, []);

  const handleLoadMore = () => {
    if (hasMore) {
      dispatch(actions.getAllUsers({ page, limit: 10 }));
    }
  };

  const handleRefresh = () => {
    dispatch(actions.getAllUsers({ page: 1, limit: 10 }));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={item => item._id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{
                uri: 'https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg',
              }}
              style={styles.image}
            />
            <View style={styles.info}>
              <Text style={styles.name}>
                {item.firstName} {item.lastName}
              </Text>
              <Text style={styles.username}>@{item.userName}</Text>
              {item.isBuyer && <Text style={styles.buyerLabel}>Buyer</Text>}
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 10,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 14,
    color: '#555',
  },
  buyerLabel: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
  },
});

export default HomeScreen;
