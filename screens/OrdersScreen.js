import { 
    View, 
    Text, 
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { auth, db } from '../constants/firebase';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrdersScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>   
      <Text> Order Screen </Text>   
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 45,
  },
});

export default OrdersScreen;