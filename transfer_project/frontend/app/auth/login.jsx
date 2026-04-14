import { View, Text } from "react-native";
import Button from "../../components/common/Button";
import { router } from "expo-router";

export default function Login() {
  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text style={{ fontSize:24, marginBottom:20 }}>Login</Text>
      <Button title="Login" onPress={() => router.replace("/dashboard/home")} />
    </View>
  );
}
