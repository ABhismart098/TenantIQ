import { View, Text, Button } from "react-native";
import { router } from "expo-router";

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to TENANTIQ</Text>
      <Button title="Go to Login" onPress={() => router.push("/login")} />
    </View>
  );
}
