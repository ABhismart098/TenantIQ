import { View, Text } from "react-native";
import Button from "../../components/common/Button";
import { router } from "expo-router";

export default function ForgotPassword() {
  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text style={{ fontSize:24, marginBottom:20 }}>Forgot Password</Text>
      <Button title="Back to Login" onPress={() => router.push("/auth/login")} />
    </View>
  );
}
