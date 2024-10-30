import React, { useState } from 'react';
import { 
  StyleSheet, TextInput, Button, Alert, View, Text, 
  FlatList, Image 
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface Feedback {
  id: string;
  username: string;
  profilePic: string;
  feedback: string;
  rating: number;
}

export default function FeedbackScreen() {
  const [username, setUsername] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([
    {
      id: '1',
      username: 'John Doe',
      profilePic: 'https://randomuser.me/api/portraits/men/32.jpg',
      feedback: 'Great service! I received my medications on time.',
      rating: 5,
    },
    {
      id: '2',
      username: 'Jane Smith',
      profilePic: 'https://randomuser.me/api/portraits/women/44.jpg',
      feedback: 'Customer support was very helpful. Highly recommended!',
      rating: 4,
    },
    {
      id: '3',
      username: 'Alice Johnson',
      profilePic: 'https://randomuser.me/api/portraits/women/68.jpg',
      feedback: 'Good pricing, but delivery was slightly delayed.',
      rating: 3,
    },

  ]);

  const handleRating = (value: number) => setRating(value);

  const handleSubmit = () => {
    if (!username || !feedback) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    const newFeedback: Feedback = {
      id: Math.random().toString(),
      username,
      profilePic: 'https://randomuser.me/api/portraits/lego/5.jpg',
      feedback,
      rating,
    };

    setFeedbackList([newFeedback, ...feedbackList]);
    Alert.alert('Thank You!', 'Your feedback has been submitted.');
    setUsername('');
    setFeedback('');
    setRating(0);
  };

  const renderFeedbackItem = ({ item }: { item: Feedback }) => (
    <View style={styles.feedbackItem}>
      <Image source={{ uri: item.profilePic }} style={styles.profilePic} />
      <View style={styles.feedbackContent}>
        <Text style={styles.username}>{item.username}</Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map(star => (
            <FontAwesome
              key={star}
              name={star <= item.rating ? 'star' : 'star-o'}
              size={16}
              color="gold"
              style={styles.star}
            />
          ))}
        </View>
        <Text style={styles.comment}>{item.feedback}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={feedbackList}
      renderItem={renderFeedbackItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.title}></Text>
          <Text style={styles.title}>We Value Your Feedback!</Text>
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Share your thoughts about our service, the drugs, and customer care"
            value={feedback}
            onChangeText={setFeedback}
            multiline
          />
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map(star => (
              <FontAwesome
                key={star}
                name={star <= rating ? 'star' : 'star-o'}
                size={30}
                color="gold"
                onPress={() => handleRating(star)}
                style={styles.star}
              />
            ))}
          </View>
          <Button title="Submit Feedback" onPress={handleSubmit} color="#2196F3" />
        </View>
      }
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  star: {
    marginHorizontal: 5,
  },
  listContainer: {
    paddingBottom: 20,
  },
  feedbackItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    elevation: 3,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  feedbackContent: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  comment: {
    marginTop: 5,
    color: '#555',
  },
});
