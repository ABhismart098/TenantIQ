import { View, Text, StyleSheet } from "react-native";

export default function AuthRole_request() {
  return (
    <View style={{styles.container}}>
      <Text style={{styles.title}}>Coming Soon</Text>
      <Text style={{styles.subtitle}}>auth/role-request.jsx</Text>
    </View>
  );
}

const styles = StyleSheet.create({{
  container: {{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff'
  }},
  title: {{
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8
  }},
  subtitle: {{
    fontSize: 16,
    color: '#666'
  }}
}});
