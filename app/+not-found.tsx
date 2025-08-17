import React from "react";
import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AlertTriangle, Home } from "lucide-react-native";
import { Colors } from "@/constants/Colors";

export default function NotFoundScreen() {
  return (
    <LinearGradient
      colors={[Colors.background.primary, Colors.background.secondary]}
      style={styles.container}
    >
      {/* Set screen options here */}
      <Stack.Screen options={{ title: "Page Not Found", headerShown: false }} />

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <LinearGradient
            colors={[
              Colors.status.warning + "20",
              Colors.status.warning + "10",
            ]}
            style={styles.iconBackground}
          >
            <AlertTriangle size={48} color={Colors.status.warning} />
          </LinearGradient>
        </View>

        <Text style={styles.title}>Page Not Found</Text>
        <Text style={styles.subtitle}>
          The page you&apos;re looking for doesn&apos;t exist in the energy
          monitoring system.
        </Text>

        <Link href="/" asChild>
          <TouchableOpacity style={styles.homeButton}>
            <LinearGradient
              colors={Colors.gradients.primary}
              style={styles.homeButtonGradient}
            >
              <Home size={20} color={Colors.primary.darkGreen} />
              <Text style={styles.homeButtonText}>Go to Dashboard</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Link>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  iconContainer: {
    marginBottom: 32,
  },
  iconBackground: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.status.warning,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.text.primary,
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
  },
  homeButton: {
    width: "100%",
  },
  homeButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  homeButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary.darkGreen,
    marginLeft: 8,
  },
});
