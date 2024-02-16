import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AuthContext from '../context/authProvider'; // Import AuthContext
import axios from 'axios';

const USERS_URL = 'http://localhost:5000/users';

const Home = () => {
  const { currentUser } = useContext(AuthContext); // Access currentUser from AuthContext
  const [fetchedUsers, setFetchedUsers] = useState<any[]>([]); // State for fetched users
  const [currentIndex, setCurrentIndex] = useState<number>(0); // State for current user index

  // Function to fetch filtered users
  const fetchFilteredUsers = async () => {
    try {
      const response = await axios.get(`${USERS_URL}/filtered-users`, {
        params: { userId: currentUser.id }
      });
      setFetchedUsers(response.data); // Update fetchedUsers state with the fetched data
    } catch (error) {
      console.error('Error fetching filtered users:', error);
    }
  };

  // Function to fetch next user
  const fetchNextUser = () => {
    setCurrentIndex(currentIndex + 1); // Increment currentIndex to move to the next user
  };

  // Function to fetch previous user
  const fetchPreviousUser = () => {
    setCurrentIndex(currentIndex - 1); // Decrement currentIndex to move to the previous user
  };

  // Fetch filtered users on component mount
  useEffect(() => {
    fetchFilteredUsers();
  }, []);

  return (
    <View style={styles.container}>
      {/* Render current user */}
      {fetchedUsers.length > 0 && currentIndex < fetchedUsers.length && currentIndex >= 0 && (
        <View style={styles.userContainer}>
          <Text style={styles.email}>Email: {fetchedUsers[currentIndex].user.email}</Text>
          <Text style={styles.selfDepiction}>Self Depiction: {fetchedUsers[currentIndex].user.selfDepiction}</Text>
          <Text style={styles.compatibility}>Compatibility: {fetchedUsers[currentIndex].compatibility}</Text>
        </View>
      )}
      
      {/* Render "Next" button */}
      <View style={styles.buttonContainer}>
        <Button title="Previous" onPress={fetchPreviousUser} disabled={currentIndex === 0} />
        <Button title="Next" onPress={fetchNextUser} disabled={currentIndex === fetchedUsers.length - 1} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  userContainer: {
    marginBottom: 20,
  },
  email: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  selfDepiction: {
    fontSize: 16,
  },
  compatibility: {
    fontSize: 14,
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
});

export default Home;
