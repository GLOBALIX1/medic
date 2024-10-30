import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface Medication {
  name: string;
  key: string;
}

interface Order {
  name: string;
  quantity: number;
  key: string;
  status: string;
}

export default function CustomerOrderScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<Medication[]>([]);
  const [orders, setOrders] = useState<Order[]>([
    { name: 'Aspirin', quantity: 2, key: '1', status: 'Pending' },
    { name: 'Ibuprofen', quantity: 1, key: '2', status: 'Shipped' },
    { name: 'Paracetamol', quantity: 5, key: '3', status: 'Delivered' },
  ]);

  const medications: Medication[] = [
    { name: 'Aspirin', key: '1' },
    { name: 'Ibuprofen', key: '2' },
    { name: 'Paracetamol', key: '3' },
    { name: 'Amoxicillin', key: '4' },
    { name: 'Metformin', key: '5' },
    { name: 'Atorvastatin', key: '6' },
    { name: 'Amlodipine', key: '7' },
    { name: 'Omeprazole', key: '8' }
  ];

  const addToCart = (medication: Medication) => {
    setCart([...cart, medication]);
    Alert.alert('Added to Cart', `${medication.name} has been added to your cart.`);
  };

  const placeOrder = () => {
    const newOrders = cart.map((medication) => ({
      ...medication,
      quantity: 1, // Assuming each order is for 1 unit; adjust as needed
      status: 'Pending',
    }));
    setOrders([...orders, ...newOrders]);
    setCart([]);
    Alert.alert('Order Placed', 'Your order has been placed successfully.');
  };

  const renderMedItem = ({ item }: { item: Medication }) => (
    <View style={styles.medItem}>
      <Text style={styles.medName}>{item.name}</Text>
      <TouchableOpacity style={styles.orderButton} onPress={() => addToCart(item)}>
        <Text style={styles.orderButtonText}>Order</Text>
      </TouchableOpacity>
    </View>
  );

  const renderOrderItem = ({ item }: { item: Order }) => (
    <View style={styles.orderRow}>
      <Text style={styles.orderCell}>{item.name}</Text>
      <Text style={styles.orderCell}>{item.quantity}</Text>
      <Text style={styles.orderCell}>{item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>
      
      <Text style={styles.subtitle}>Welcome to our pharmacy orders. Search your order</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Search medications"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        style={styles.medList}
        data={medications.filter(med => med.name.toLowerCase().includes(searchQuery.toLowerCase()))}
        renderItem={renderMedItem}
        keyExtractor={(item) => item.key}
      />

      <TouchableOpacity style={styles.cartButton} onPress={placeOrder}>
        <FontAwesome name="shopping-cart" size={24} color="white" />
        <Text style={styles.cartButtonText}>Place Order ({cart.length})</Text>
      </TouchableOpacity>

      <Text style={styles.orderHistoryTitle}>Order History</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>Name</Text>
          <Text style={styles.headerCell}>Quantity</Text>
          <Text style={styles.headerCell}>Status</Text>
          <Text style={styles.headerCell}>price</Text>
        </View>
        <FlatList
          style={styles.orderList}
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.key}
        />
      </View>

      <TouchableOpacity style={styles.profileButton}>
        <FontAwesome name="user" size={24} color="white" />
        <Text style={styles.profileButtonText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4a4a4a',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#6c757d',
    marginBottom: 20,
  },
  searchBar: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '100%',
    backgroundColor: '#fff',
  },
  medList: {
    width: '100%',
  },
  medItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    elevation: 2,
  },
  medName: {
    fontSize: 16,
    color: '#333',
  },
  orderButton: {
    backgroundColor: '#28a745',
    padding: 8,
    borderRadius: 5,
  },
  orderButtonText: {
    color: 'white',
    fontSize: 14,
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
  orderHistoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a4a4a',
    marginTop: 30,
    marginBottom: 10,
  },
  table: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
    elevation: 2,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#ddd',
    padding: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  orderList: {
    width: '100%',
  },
  orderRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  orderCell: {
    flex: 1,
    textAlign: 'center',
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6c757d',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    marginTop: 10,
  },
  profileButtonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
});
