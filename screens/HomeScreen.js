import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../utils/colors";
import { useEffect, useState } from "react";
import { apiClient } from "../utils/api";





export default function HomeScreen() {
  const [posts,setPosts] = useState([])
  const [pagination,setPagination] = useState({
    currentPage:1,
    totalPages:0,
    totalCount:0,
    limit:5,
  });

  useEffect(async() =>{
    //fetch from API
    const response = await apiClient.get("/posts");
    console.log("Posts fetched:",response.data.data.posts);
    setPosts(response.data.data.posts);
    setPagination(response.data.data.pagination);

  },[]);



  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Home</Text>
      {posts.length>0?(
        posts.map((post) =>(
          <Text key={post.id} style={styles.body}>
            {post.title} = {post.content}
          </Text>
        ))
      
    ) : (
      <Text style={styles.body}>
        No post avaliable
      </Text>
    )}
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
    marginBottom: 12,
  },
  body: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
});
