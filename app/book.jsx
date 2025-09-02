import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useRouter } from "expo-router";
import BookNewModal from "./BookNewModal";
import { useIsFocused } from "@react-navigation/native";

const Book = () => {
    const [data, setData] = useState([]);
    const { color } = useTheme();
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const isFocused = useIsFocused();

    const bookData = async () => {
        try {
            const response = await fetch("http://10.0.15.100:3000/api/books?page=1&limit=10");
            const result = await response.json();
            console.log("Book data fetched successfully");
            setData(result.books);
        } catch (error) {
            console.error("Error fetching book data:", error);
        }
    };

    useEffect(() => {
        bookData(); // ดึงข้อมูลใหม่ทุกครั้งที่หน้าถูก focus
    }, [isFocused]);


    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={[styles.container, { backgroundColor: color.background }]} showsVerticalScrollIndicator={false}>
                {data.length > 0 ? (
                    data.map((book) => (
                        <TouchableOpacity
                            key={book._id}
                            style={[styles.card, { backgroundColor: color.surface }]}
                            onPress={() => router.push(`/book_detail?id=${book._id}`)}
                        >

                            <Image
                                source={require("../assets/book-placeholder.png")} // ✅ เปลี่ยนเป็น path รูปจริงถ้ามี
                                style={styles.coverImage}
                                resizeMode="cover"
                            />
                            <View style={styles.cardContent}>
                                <Text style={[styles.title, { color: color.primary }]} numberOfLines={1}>
                                    {book.title}
                                </Text>
                                <Text style={[styles.text, { color: color.textSecondary }]}>
                                    <Text style={styles.label}>Author: </Text>{book.author}
                                </Text>
                                <Text style={[styles.text, { color: color.textSecondary }]}>
                                    <Text style={styles.label}>Genre: </Text>{book.genre}
                                </Text>
                                <Text style={[styles.text, { color: color.textSecondary }]}>
                                    <Text style={styles.label}>Year: </Text>{book.year}
                                </Text>
                                <Text style={[styles.availability, { color: book.available ? "#28a745" : "#dc3545" }]}>
                                    {book.available ? "Available ✅" : "Not Available ❌"}
                                </Text>
                                <Text style={[styles.price, { color: color.textSecondary }]}>${book.price}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={styles.noData}>No books found.</Text>
                )}
            </ScrollView>
            <TouchableOpacity
                style={[styles.fab, { backgroundColor: color.primary }]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>

            <BookNewModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onCreate={bookData} // รีเฟรช list หลังสร้างหนังสือ
            />
        </View>
    );
};

export default Book;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    card: {
        flexDirection: "row",
        marginBottom: 20,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        overflow: "hidden",
    },
    coverImage: {
        width: 100,
        height: 150,
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
    },
    cardContent: {
        flex: 1,
        padding: 10,
        justifyContent: "space-between",
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        fontStyle: "italic",
        marginBottom: 4,
    },
    text: {
        fontSize: 14,
        marginBottom: 2,
    },
    label: {
        fontWeight: "600",
    },
    availability: {
        fontWeight: "600",
        marginTop: 4,
    },
    price: {
        marginTop: 6,
        fontSize: 16,
        fontWeight: "bold",
    },
    noData: {
        textAlign: "center",
        fontSize: 16,
        marginTop: 40,
        color: "#888",
    },
    fab: {
        position: "absolute",
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    fabText: {
        color: "#fff",
        fontSize: 32,
        fontWeight: "bold",
        lineHeight: 34,
    },
});
