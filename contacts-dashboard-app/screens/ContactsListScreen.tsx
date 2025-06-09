import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ContactCard from '../components/ContactCard';
import { RootStackParamList } from '../types/Navigation'; 

interface Contact {
  login: { uuid: string };
  name: { first: string; last: string };
  email: string;
  picture: { thumbnail: string; large: string };
  phone: string;
}

// Navigation prop type
type ContactListNavProp = NativeStackNavigationProp<RootStackParamList, 'ContactList'>;

const ContactsListScreen: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<ContactListNavProp>();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch('https://randomuser.me/api/?results=10');
        const data = await res.json();
        setContacts(data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handlePress = (contact: Contact) => {
    navigation.navigate('ContactDetail', { contact });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <FlatList
      data={contacts}
      keyExtractor={(item) => item.login.uuid}
      renderItem={({ item }) => (
        <ContactCard contact={item} onPress={() => handlePress(item)} />
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default ContactsListScreen;

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
