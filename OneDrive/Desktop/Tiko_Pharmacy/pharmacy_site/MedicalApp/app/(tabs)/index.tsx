import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet, Text, View, TextInput, FlatList,
  TouchableOpacity, Alert, Image, ScrollView, Animated, Easing
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// Sample medication data including images
interface Medication {
  name: string;
  key: string;
  image: string;
  category: string;
}

export default function PharmacyHomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<Medication[]>([]);
  
  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current; // Screen fade-in
  const medAnim = useRef(new Animated.Value(0)).current;  // List item spring

  const medications: Medication[] = [
    { name: 'Aspirin', key: '1', category: 'Pain Relief', image: 'https://th.bing.com/th/id/R.93c7d7e95b69573da7f7e388c4356032?rik=6NhT7TKAwWfi%2fw&pid=ImgRaw&r=0' },
    { name: 'Ibuprofen', key: '2', category: 'Pain Relief', image: 'https://th.bing.com/th/id/OIP.FT_UCrWU9o82TwtP3of49gHaHa?rs=1&pid=ImgDetMain' },
    { name: 'Paracetamol', key: '3', category: 'Cold & Fever', image: 'https://th.bing.com/th/id/R.cd3f7b9d4f6371b4a382f2ee72c5282e?rik=1vj9i1en%2bxtxYw&pid=ImgRaw&r=0' },
    { name: 'Amoxicillin', key: '4', category: 'Antibiotics', image: 'https://th.bing.com/th/id/R.a5ef4fce134755164e7ee8f0785291a8?rik=88jh7Cj%2fRW9l%2bg&pid=ImgRaw&r=0' },
  ];

  useEffect(() => {
    // Screen fade-in animation on mount
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const addToCart = (medication: Medication) => {
    setCart([...cart, medication]);
    Alert.alert('Added to Cart', `${medication.name} has been added to your cart.`);
  };

  const renderMedItem = ({ item, index }: { item: Medication, index: number }) => {
    // Trigger spring animation on each list item
    Animated.spring(medAnim, {
      toValue: 1,
      friction: 5,
      tension: 100,
      delay: index * 100, // Stagger effect for each item
      useNativeDriver: true,
    }).start();

    return (
      <Animated.View style={[styles.medItem, { transform: [{ scale: medAnim }] }]}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => addToCart(item)}>
          <Image source={{ uri: item.image }} style={styles.medImage} />
          <View style={styles.medInfo}>
            <Text style={styles.medName}>{item.name}</Text>
            <Text style={styles.medCategory}>{item.category}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const filteredMeds = medications.filter(med =>
    med.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Animated.ScrollView
      contentContainerStyle={styles.container}
      style={{ opacity: fadeAnim }} // Apply fade-in animation to the whole screen
    >
      <Text style={styles.title}></Text>
      <Text style={styles.title}>Customer Dashboard</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search medications..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <Image
        source={{ uri: 'https://www.business.com/images/content/5e7/26d819c658ad0798b4568/1500-0-' }}
        style={styles.bannerImage}
      />
      <Text style={styles.sectionTitle}>Featured Products</Text>

      <FlatList
        style={styles.medList}
        data={filteredMeds}
        renderItem={renderMedItem}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.noResults}>No results found.</Text>}
      />

      <View style={styles.videoSection}>
        <Text style={styles.sectionTitle}>Health Tips Video</Text>
        <Image
          source={{ uri: 'https://granerx.com/wp-content/uploads/2019/06/training2.jpg' }}
          style={styles.videoThumbnail}
        />
      </View>

      <TouchableOpacity style={styles.cartButton}>
        <FontAwesome name="shopping-cart" size={24} color="white" />
        <Text style={styles.cartButtonText}>View Cart ({cart.length})</Text>
      </TouchableOpacity>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4a4a4a',
    marginBottom: 15,
  },
  searchBar: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  bannerImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  medList: {
    marginBottom: 20,
  },
  medItem: {
    width: 140,
    backgroundColor: '#fff',
    marginRight: 15,
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  medImage: {
    width: '100%',
    height: 80,
    borderRadius: 8,
  },
  medInfo: {
    marginTop: 10,
    alignItems: 'center',
  },
  medName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  medCategory: {
    fontSize: 12,
    color: '#777',
  },
  videoSection: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  videoThumbnail: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    marginTop: 20,
  },
  cartButtonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#999',
  },
});
