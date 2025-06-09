import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';

interface Contact {
  name: { first: string; last: string };
  email: string;
  picture: { thumbnail: string };
}

interface Props {
  contact: Contact;
  onPress: () => void;
}

const ContactCard: React.FC<Props> = ({ contact, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: contact.picture.thumbnail }} style={styles.image} />
      <View>
        <Text style={styles.name}>{contact.name.first} {contact.name.last}</Text>
        <Text style={styles.email}>{contact.email}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ContactCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  email: {
    color: 'gray',
  },
});
