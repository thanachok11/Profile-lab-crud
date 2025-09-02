import { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, Alert, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BookNewModal = ({ visible, onClose, onCreate }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [genre, setGenre] = useState("");
    const [year, setYear] = useState("");
    const [price, setPrice] = useState("");
    const [available, setAvailable] = useState(true);

    const handleCreate = async () => {
        if (!title || !author || !genre || !year || !price) {
            Alert.alert("Error", "Please fill all required fields!");
            return;
        }

        const bookData = {
            title,
            author,
            description,
            genre,
            year: parseInt(year),
            price: parseFloat(price),
            available,
        };

        try {
            // ดึง token ของ user จาก AsyncStorage
            const token = await AsyncStorage.getItem("authToken");

            if (!token) {
                Alert.alert("Error", "User not authenticated!");
                return;
            }

            const response = await fetch("http://10.0.15.100:3000/api/books", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // ส่ง token
                },
                body: JSON.stringify(bookData),
            });

            const result = await response.json();

            if (response.ok) {
                Alert.alert("Success", "Book created successfully!");
                onCreate(); // รีเฟรช list
                onClose();  // ปิด modal
            } else {
                Alert.alert("Error", result.message || "Failed to create book.");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Failed to create book.");
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <ScrollView>
                        <Text style={styles.modalTitle}>Create New Book</Text>

                        <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
                        <TextInput style={styles.input} placeholder="Author" value={author} onChangeText={setAuthor} />
                        <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
                        <TextInput style={styles.input} placeholder="Genre" value={genre} onChangeText={setGenre} />
                        <TextInput style={styles.input} placeholder="Year" keyboardType="numeric" value={year} onChangeText={setYear} />
                        <TextInput style={styles.input} placeholder="Price" keyboardType="numeric" value={price} onChangeText={setPrice} />

                        <View style={styles.buttons}>
                            <TouchableOpacity style={styles.button} onPress={handleCreate}>
                                <Text style={styles.buttonText}>Create</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

export default BookNewModal;

const styles = StyleSheet.create({
    modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
    modalContent: { width: "90%", backgroundColor: "#fff", borderRadius: 16, padding: 20, elevation: 10 },
    modalTitle: { fontSize: 20, fontWeight: "700", marginBottom: 20, textAlign: "center" },
    input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 10 },
    buttons: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
    button: { flex: 1, backgroundColor: "#28a745", padding: 12, borderRadius: 8, marginHorizontal: 5, alignItems: "center" },
    cancelButton: { backgroundColor: "#dc3545" },
    buttonText: { color: "#fff", fontWeight: "600" },
});
