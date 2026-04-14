import { View, Text } from "react-native";
import Button from "../../components/common/Button";
import { router } from "expo-router";

export default function Register() {
  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text style={{ fontSize:24, marginBottom:20 }}>Register</Text>
      <Button title="Go to Login" onPress={() => router.push("/auth/login")} />
    </View>
  );
}
