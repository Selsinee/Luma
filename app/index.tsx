import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const FeatureItem = ({
  icon,
  label,
}: {
  icon: keyof typeof Feather.glyphMap;
  label: string;
}) => (
  <View style={styles.featureItem}>
    <Feather name={icon} size={28} color="#A9B0D2" />
    <Text style={styles.featureLabel}>{label}</Text>
  </View>
);

export default function AuthScreen() {
  // --- State Management ---
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleSignIn = () => {
    router.replace('/(app)/(tabs)');
  };

  const handleCreateAccount = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    Alert.alert('Account Created', `Name: ${fullName}\nEmail: ${email}`);
  };

  const handleGoogleAuth = () => {
    router.replace('/(app)/(tabs)');
  };

  // --- Dynamic Content based on Auth Mode ---
  const isSignIn = authMode === 'signin';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.appHeader}>
          <Feather name="code" size={48} color="#A9B0D2" />
          <Text style={styles.appName}>Luma</Text>
          <Text style={styles.appTagline}>Learn smarter, not harder</Text>
        </View>

        <View style={styles.featuresContainer}>
          <FeatureItem icon="book-open" label="Smart Cards" />
          <FeatureItem icon="activity" label="Progress Tracking" />
          <FeatureItem icon="bar-chart-2" label="Analytics" />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.welcomeBackTitle}>
            {isSignIn ? 'Welcome back' : 'Create account'}
          </Text>
          <Text style={styles.welcomeBackSubtitle}>
            {isSignIn
              ? 'Sign in to continue your learning journey'
              : 'Join thousands of learners worldwide'}
          </Text>

          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleAuth}
          >
            <Feather name="globe" size={20} color="#555" />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          <View style={styles.orDivider}>
            <View style={styles.dividerLine} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* --- Sign Up Fields (Conditional) --- */}
          {!isSignIn && (
            <>
              <Text style={styles.inputLabel}>Full Name</Text>
              <View style={styles.inputField}>
                <Feather name="user" size={20} color="#9E9E9E" />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your full name"
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>
            </>
          )}

          <Text style={styles.inputLabel}>Email</Text>
          <View style={styles.inputField}>
            <Feather name="mail" size={20} color="#9E9E9E" />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.inputField}>
            <Feather name="lock" size={20} color="#9E9E9E" />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Feather
                name={showPassword ? 'eye' : 'eye-off'}
                size={20}
                color="#9E9E9E"
              />
            </TouchableOpacity>
          </View>

          {/* --- Confirm Password & Forgot Password (Conditional) --- */}
          {isSignIn ? (
            <TouchableOpacity style={styles.forgotPasswordButton}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>
          ) : (
            <>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <View style={styles.inputField}>
                <Feather name="lock" size={20} color="#9E9E9E" />
                <TextInput
                  style={styles.textInput}
                  placeholder="Confirm your password"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Feather
                    name={showConfirmPassword ? 'eye' : 'eye-off'}
                    size={20}
                    color="#9E9E9E"
                  />
                </TouchableOpacity>
              </View>
            </>
          )}

          {/* --- Main Action Button (Conditional) --- */}
          <TouchableOpacity
            style={styles.signInButton}
            onPress={isSignIn ? handleSignIn : handleCreateAccount}
          >
            <Text style={styles.signInButtonText}>
              {isSignIn ? 'Sign In' : 'Create Account'}
            </Text>
            <Feather
              name="arrow-right"
              size={18}
              color="#FFFFFF"
              style={styles.signInArrow}
            />
          </TouchableOpacity>

          {/* --- Bottom Link to Switch Modes (Conditional) --- */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>
              {isSignIn
                ? "Don't have an account? "
                : 'Already have an account? '}
            </Text>
            <TouchableOpacity
              onPress={() => setAuthMode(isSignIn ? 'signup' : 'signin')}
            >
              <Text style={styles.signUpLink}>
                {isSignIn ? 'Sign up' : 'Sign in'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.footerText}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
// Styles are the same as the previous response, with minor adjustments
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F9F9FB' },
  scrollContent: { flexGrow: 1, padding: 20, alignItems: 'center' },
  appHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  appName: { fontSize: 28, fontWeight: 'bold', color: '#333', marginTop: 10 },
  appTagline: { fontSize: 16, color: '#666', marginTop: 4 },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 24,
  },
  featureItem: { alignItems: 'center', width: '30%' },
  featureLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  welcomeBackTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeBackSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F7',
    borderRadius: 10,
    paddingVertical: 14,
    marginBottom: 20,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 10,
  },
  orDivider: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E0E0E0' },
  orText: { marginHorizontal: 10, color: '#9E9E9E', fontSize: 14 },
  inputLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E8E8F0',
  },
  textInput: { flex: 1, marginLeft: 10, fontSize: 16, color: '#333' },
  forgotPasswordButton: { alignSelf: 'flex-end', marginBottom: 20 },
  forgotPasswordText: { color: '#A9B0D2', fontSize: 14, fontWeight: '500' },
  signInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A9B0D2',
    borderRadius: 10,
    paddingVertical: 14,
    marginBottom: 20,
  },
  signInButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
  signInArrow: { marginLeft: 10 },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  signUpText: { fontSize: 14, color: '#666' },
  signUpLink: { fontSize: 14, color: '#A9B0D2', fontWeight: '600' },
  footerText: {
    fontSize: 12,
    color: '#9E9E9E',
    textAlign: 'center',
    lineHeight: 18,
  },
});
