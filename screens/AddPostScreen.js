import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { COLORS } from "../utils/colors";
import { useState } from "react";
import { TextInput } from "react-native";
import{apiClient}from "../utils/api"


export default function AddPostScreen() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit() {
    
      Alert.alert("Post Submitted");
      apiClient.post("Post Submitted");
      try{
        const response = await apiClient.post("/posts",{title,content})
        console.log("Post created:",response.data);

        setContent("");
        setTitle("");
        Alert.alert("Success","Post created successfully"); 
      }
      catch(error){
        Alert.alert("Error","Failed to submit post");
      }  
   
  }

  return (
    <View style={styles.container}>
      <Text>
        {title} {content}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
