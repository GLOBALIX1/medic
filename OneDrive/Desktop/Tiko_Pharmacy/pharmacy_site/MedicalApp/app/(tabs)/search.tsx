import React, { useState } from 'react';
import {
  StyleSheet, View, Text, Image, Animated, TextInput, ScrollView, TouchableOpacity,
  KeyboardAvoidingView, Platform
} from 'react-native';

const drugs = [
  { name: 'Aspirin', image: 'https://th.bing.com/th/id/R.93c7d7e95b69573da7f7e388c4356032?rik=6NhT7TKAwWfi%2fw&pid=ImgRaw&r=0' },
  { name: 'Ibuprofen', image: 'https://th.bing.com/th/id/OIP.FT_UCrWU9o82TwtP3of49gHaHa?rs=1&pid=ImgDetMain' },
  { name: 'Paracetamol', image: 'https://th.bing.com/th/id/R.cd3f7b9d4f6371b4a382f2ee72c5282e?rik=1vj9i1en%2bxtxYw&pid=ImgRaw&r=0' },
  { name: 'Amoxicillin', image: 'https://th.bing.com/th/id/R.a5ef4fce134755164e7ee8f0785291a8?rik=88jh7Cj%2fRW9l%2bg&pid=ImgRaw&r=0' },
  { name: 'Metformin', image: 'https://th.bing.com/th/id/R.a5ef4fce134755164e7ee8f0785291a8?rik=88jh7Cj%2fRW9l%2bg&pid=ImgRaw&r=0' },
  { name: 'Omeprazole', image: 'https://th.bing.com/th/id/R.a5ef4fce134755164e7ee8f0785291a8?rik=88jh7Cj%2fRW9l%2bg&pid=ImgRaw&r=0' },
  { name: 'Lisinopril', image: 'https://th.bing.com/th/id/R.a5ef4fce134755164e7ee8f0785291a8?rik=88jh7Cj%2fRW9l%2bg&pid=ImgRaw&r=0' },
  { name: 'Lisinopril', image: 'https://th.bing.com/th/id/R.a5ef4fce134755164e7ee8f0785291a8?rik=88jh7Cj%2fRW9l%2bg&pid=ImgRaw&r=0' },
];

export default function DrugScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const scrollY = new Animated.Value(0);

  const filteredDrugs = drugs.filter(drug =>
    drug.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Text style={styles.title}></Text>
      <Text style={styles.title}>Search Available drugs</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a drug..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <Animated.ScrollView
        contentContainerStyle={styles.scrollContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        <View style={styles.drugGrid}>
          {filteredDrugs.map((drug, index) => {
            const inputRange = [-1, 0, 100 * index, 100 * (index + 2)];
            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [1, 1, 1, 0]
            });

            return (
              <Animated.View key={index} style={[styles.drugItem, { transform: [{ scale }] }]}>
                <Image source={{ uri: drug.image }} style={styles.drugImage} />
                <Text style={styles.drugName}>{drug.name}</Text>
                <TouchableOpacity style={styles.buyButton}>
                  <Text style={styles.buyButtonText}>Buy</Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      </Animated.ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a4a4a',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
    width: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  drugGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  drugItem: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  drugImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  drugName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  buyButton: {
    backgroundColor: '#28a745',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
