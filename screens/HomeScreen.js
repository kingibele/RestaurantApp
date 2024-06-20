import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bars3CenterLeftIcon, ShoppingCartIcon } from 'react-native-heroicons/solid';
import { categories } from '../constants';
import * as Animatable from 'react-native-animatable';
import FoodCard from '../components/FoodCard';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../constants/firebase';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('burger');
  const [foodItems, setFoodItems] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const foodCollection = collection(db, 'food');
        const foodSnapshot = await getDocs(foodCollection);
        const foodList = foodSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFoodItems(foodList);
        console.log("Fetched Food Items: ", foodList); 
      } catch (error) {
        console.error("Error fetching food items: ", error);
      }
    };

    fetchFoodItems();
  }, []);
  
  const filteredFoodItems = foodItems.filter(item => item.category === activeCategory);

  return (
    <View className="flex-1 relative">
      <Image blurRadius={40} source={require('../assets/images/background.png')} className="absolute w-full h-full" />
      <SafeAreaView className="flex-1">
        {/* Top Buttons */}
        <View className="flex-row justify-between items-center mx-4">
         
          <TouchableOpacity
            onPress={()=> navigation.navigate('Profile')}         
          >
            <Image 
              className="h-12 w-12 rounded-2xl" 
              source={require('../assets/images/avatar.jpeg')} 
              style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}
            /> 
          </TouchableOpacity>  

          <View className="bg-white shadow-md rounded-2xl p-3">
            <TouchableOpacity
              onPress={()=> navigation.navigate('Cart')}         
            >
              {/* <Bars3CenterLeftIcon size="25" stroke={100} color="black" /> */}
              <ShoppingCartIcon size="25" stroke={100} color="black" />
            </TouchableOpacity>
          </View>

        </View>

        {/* Punch Line */}
        <View className="my-12 space-y-2">
          <Text className="mx-4 text-5xl font-medium text-gray-800">For the Love of </Text>
          <Text className="mx-4 text-5xl font-medium text-gray-800">
            <Text className="text-yellow-400 font-extrabold">Delicious</Text> Food
          </Text>
        </View>
        {/* Categories Scrollbar */}
        <ScrollView
          className="mt-6 pt-6 max-h-20"
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {categories.map((category, index) => {
            let isActive = category === activeCategory;
            let textClass = isActive ? ' font-bold' : '';
            return (
              <Animatable.View
                delay={index * 120} // delay for each item
                animation="slideInDown" // animation type
                key={index}>
                <TouchableOpacity
                  className="mr-9"
                  onPress={() => setActiveCategory(category)}
                >
                  <Text className={"text-white text-base tracking-widest " + textClass}>
                    {category}
                  </Text>
                  {isActive && (
                    <View className="flex-row justify-center">
                      <Image source={require('../assets/images/line.png')} className="h-4 w-5" />
                    </View>
                  )}
                </TouchableOpacity>
              </Animatable.View>
            );
          })}
        </ScrollView>

        {/* Food Cards */}
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {filteredFoodItems.map((item, index) => (
            <FoodCard item={item} index={index} key={index} />
          ))}
        </ScrollView>
        
      </SafeAreaView>
    </View>
  );
}
