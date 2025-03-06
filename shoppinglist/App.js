import { addDoc, collection, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, TextInput } from 'react-native';
import { db } from './firebaseConfig';
import { useState, useEffect } from 'react';

export default function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);  

  const fetchItems = async () => {
    const querySnapshot = await getDoc(collection(db, "shoppinglist"));
    const itemList = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));

    setItems(itemList)
  }

  const addItem = async () => {
    if(input.trim() === "")
      return;
    console.log("adding item: ", input);
    try {
      const docRef = await addDoc(collection(db, "shoppinglist"), {name: input});
      console.log("added item id: ", docRef.id);
      setItems([...items, {id: docRef.id, name: input}]);
      setInput("")
    } catch (error) {
      console.log("Error adding item: ", error)
    }
  }

  const removeItem = async (id) => {
    await deleteDoc(doc(db,"shoppinglist", id));
    setItems(items.filter(item => item.id !== id));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping list</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input} 
          value={input}
          onChangeText={setInput}
          placeholder='Add item...' />
        <Button title='Add' onPress={addItem} />
      </View>
      <FlatList 
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => removeItem(item.id)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    padding: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  inputContainer: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  }
});
