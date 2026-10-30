import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function ConfirmationScreen() {
  const { firstName } = useLocalSearchParams<{ firstName: string }>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account created for {firstName}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
  },
});
