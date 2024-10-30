import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native';

interface Medication {
  name: string;
  key: string;
  image: string;
  price: number;
}

const sampleCart: Medication[] = [
  { name: 'Aspirin', key: '1', image: 'https://example.com/aspirin.jpg', price: 5.00 },
  { name: 'Ibuprofen', key: '2', image: 'https://example.com/ibuprofen.jpg', price: 8.00 },
  // Add more items if needed
];

export default function CartScreen() {
  const [cart, setCart] = useState<Medication[]>(sampleCart);

  const removeItem = (item: Medication) => {
    setCart(cart.filter(cartItem => cartItem.key !== item.key));
  };

  const checkout = () => {
    Alert.alert('Checkout', 'Proceed to payment.');
    // TODO: Handle the checkout process
  };

  const renderCartItem = ({ item }: { item: Medication }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.cartImage} />
      <View style={styles.cartDetails}>
        <Text style={styles.cartName}>{item.name}</Text>
        <Text style={styles.cartPrice}>${item.price.toFixed(2)}</Text>
        <TouchableOpacity style={styles.removeButton} onPress={() => removeItem(item)}>
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={item => item.key}
        ListEmptyComponent={<Text style={styles.emptyCartText}>Your cart is empty.</Text>}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${total}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={checkout}>
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  cartItem: {
    flexDirection: 'row',
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
  cartImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  cartDetails: {
    flex: 1,
  },
  cartName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cartPrice: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  removeButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  totalContainer: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  checkoutButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 18,
  },
  emptyCartText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});
