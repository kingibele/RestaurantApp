import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth, db } from '../constants/firebase';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { doc, getDoc, getDocs, query, collection, where, } from 'firebase/firestore';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getUserData = async () => {
    const userQuery = query(
      collection(db, 'users'),
      where('uid', '==', auth.currentUser.uid)
    );
    try {
      const userSnapshot = await getDocs(userQuery);
      if (userSnapshot.size === 0) {
        console.error('User not found');
        return;
      }
      const userDoc = userSnapshot.docs[0];
      const user = userDoc.data();
      if (!user) {
        console.error('User data is null');
        return;
      }
      
      setUserData({
        ...user,
      });
     
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  const fetchData = async () => {
    try {
      await getUserData();
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, [auth.currentUser]);

  
  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace('Login'); 
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome {userData.fullName || ''}</Text>
        <Text style={styles.emailText}>{userData.email || ''}</Text>
      </View>
      <View style={styles.menu}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            {item.icon}
            <Text style={styles.menuItemText}>{item.name}</Text>          
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const menuItems = [
  { name: 'Orders', icon: <MaterialIcons name="list-alt" size={24} color="black" /> },
  { name: 'Saved Items', icon: <Ionicons name="heart-outline" size={24} color="black" /> },
];

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 50,
  },
  header: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  emailText: {
    fontSize: 16,
    color: 'gray',
  },
  menu: {
    borderTopWidth: 1,
    borderColor: '#f0f0f0',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  menuItemText: {
    marginLeft: 15,
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'red',
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
