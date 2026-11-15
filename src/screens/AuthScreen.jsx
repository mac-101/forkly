import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useStore } from "../store";
import { colors, radius } from "../theme";

// mode = "login" | "signup"
export default function AuthScreen({ mode }) {
  const isSignup = mode === "signup";
  const router = useRouter();
  const signUp = useStore((s) => s.signUp);
  const login = useStore((s) => s.login);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const submit = () => {
    setError("");
    if (isSignup && !name.trim()) return setError("Please enter your name.");
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return setError("Enter a valid email address.");
    if (isSignup ? password.length < 6 : password.length === 0) {
      return setError(isSignup ? "Password must be at least 6 characters." : "Enter your password.");
    }
    const result = isSignup ? signUp({ name, email }) : login({ email });
    if (!result.ok) setError(result.error);
    // on success the root layout sends you into the app
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.brandRow}>
            <View style={styles.brandIcon}>
              <Ionicons name="restaurant" size={16} color={colors.white} />
            </View>
            <Text style={styles.brand}>Forkly</Text>
          </View>

          <Text style={styles.title}>{isSignup ? "Create account" : "Welcome back"}</Text>
          <Text style={styles.subtitle}>
            {isSignup
              ? "Sign up to start ordering and booking."
              : "Log in to pick up where you left off."}
          </Text>

          <View style={styles.form}>
            {isSignup && (
              <View style={styles.field}>
                <Ionicons name="person-outline" size={20} color={colors.muted} />
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Full name"
                  placeholderTextColor={colors.muted}
                  autoCapitalize="words"
                  style={styles.input}
                />
              </View>
            )}
            <View style={styles.field}>
              <Ionicons name="mail-outline" size={20} color={colors.muted} />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                placeholderTextColor={colors.muted}
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
                style={styles.input}
              />
            </View>
            <View style={styles.field}>
              <Ionicons name="lock-closed-outline" size={20} color={colors.muted} />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor={colors.muted}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                style={styles.input}
              />
              <Pressable onPress={() => setShowPassword((v) => !v)} hitSlop={10}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={colors.muted}
                />
              </Pressable>
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Pressable onPress={submit} style={styles.primary}>
              <Text style={styles.primaryText}>{isSignup ? "Sign up" : "Log in"}</Text>
            </Pressable>
          </View>

          <View style={styles.switchRow}>
            <Pressable onPress={() => router.replace( "/onboarding")}>
              <Text style={styles.switchText}>
                {isSignup ? "Already have an account?" : "New to Forkly?"}
              </Text>
            </Pressable>
            <Pressable onPress={() => router.replace(isSignup ? "/login" : "/signup")}>
              <Text style={styles.switchLink}>{isSignup ? "Log in" : "Create account"}</Text>
            </Pressable>
          </View>

          <Text style={styles.footnote}>
            Demo app: your account is saved on this device only.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { width: "100%", maxWidth: 480, alignSelf: "center", padding: 20, paddingBottom: 40 },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 8 },
  brandIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  brand: { fontSize: 22, fontWeight: "700", color: colors.primary },
  title: { marginTop: 40, fontSize: 32, fontWeight: "700", color: colors.text },
  subtitle: { marginTop: 8, fontSize: 16, lineHeight: 24, color: colors.muted },
  form: { marginTop: 28, gap: 14 },
  field: {
    height: 58,
    paddingHorizontal: 18,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  input: { flex: 1, fontSize: 16, color: colors.text, height: "100%" },
  error: { fontSize: 14, color: colors.primary, paddingHorizontal: 6 },
  primary: {
    height: 58,
    marginTop: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryText: { fontSize: 18, fontWeight: "500", color: colors.white },
  switchRow: { marginTop: 24, flexDirection: "row", justifyContent: "center", gap: 6 },
  switchText: { fontSize: 15, color: colors.muted },
  switchLink: { fontSize: 15, fontWeight: "600", color: colors.primary },
  footnote: { marginTop: 24, textAlign: "center", fontSize: 12, color: colors.muted },
});
