import Avatar from '@/components/Avatar';
import Colors from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import { useUpdateUser } from '@/hooks/useUpdateUser';
import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface EditProfileModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isVisible,
  onClose,
}) => {
  const { user } = useAuth();
  const { updateUserProfile, isLoading } = useUpdateUser();

  const [fullName, setFullName] = useState(user?.full_name || '');
  const [bio, setBio] = useState(user?.bio || '');

  useEffect(() => {
    if (user) {
      setFullName(user.full_name);
      setBio(user.bio || '');
    }
  }, [user, isVisible]);

  const handleSaveChanges = async () => {
    if (!fullName) {
      Alert.alert('Error', 'Name cannot be empty.');
      return;
    }

    const success = await updateUserProfile({
      full_name: fullName,
      bio: bio,
    });

    if (success) {
      onClose();
    }
  };

  const handlePickImage = () => {
    Alert.alert('Upload Picture', 'Image picker would open here.');
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalBackdrop} onPress={onClose}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <Pressable
            style={styles.modalContent}
            onPress={e => e.stopPropagation()}
          >
            {/* Header */}
            <View style={styles.header}>
              <Feather name="user" size={20} color="#A9B0D2" />
              <Text style={styles.headerTitle}>Edit Profile</Text>
              <TouchableOpacity onPress={onClose}>
                <Feather name="x" size={24} color="#555" />
              </TouchableOpacity>
            </View>

            {/* Avatar Section */}
            <View style={styles.avatarSection}>
              <TouchableOpacity
                style={styles.avatarContainer}
                onPress={handlePickImage}
              >
                {user?.avatar_url ? (
                  <Avatar avatarUrl={user.avatar_url} size={100} />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Feather name="user" size={40} color="#A9B0D2" />
                  </View>
                )}
                <View style={styles.cameraOverlay}>
                  <Feather name="camera" size={14} color="#FFFFFF" />
                </View>
              </TouchableOpacity>
              <Text style={styles.avatarHelpText}>
                Tap the avatar to upload a new profile picture
              </Text>
            </View>

            {/* Form Section */}
            <View style={styles.formSection}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <View style={styles.inputContainer}>
                <Feather name="user" size={18} color="#9E9E9E" />
                <TextInput
                  style={styles.textInput}
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>

              <Text style={styles.inputLabel}>Bio</Text>
              <View style={[styles.inputContainer, styles.bioInputContainer]}>
                <Feather
                  name="edit-3"
                  size={18}
                  color="#9E9E9E"
                  style={{ paddingTop: 14 }}
                />
                <TextInput
                  style={[styles.textInput, styles.bioTextInput]}
                  placeholder="Tell us a little about yourself..."
                  value={bio}
                  onChangeText={setBio}
                  multiline={true}
                  maxLength={150}
                />
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onClose}
                disabled={isLoading}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleSaveChanges}
                disabled={isLoading}
              >
                <Text style={styles.saveButtonText}>
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
    marginLeft: -12,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'relative',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    backgroundColor: '#F0F0F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraOverlay: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: Colors.primary,
    borderRadius: 15,
    padding: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  avatarHelpText: {
    fontSize: 13,
    color: '#666',
    marginTop: 12,
    textAlign: 'center',
  },
  formSection: {},
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E8E8F0',
  },
  bioInputContainer: {
    height: 100,
    alignItems: 'flex-start',
  },
  bioTextInput: {
    height: '100%',
    textAlignVertical: 'top',
    paddingTop: 14,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 10,
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#A9B0D2',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});
