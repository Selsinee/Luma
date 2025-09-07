import Avatar from '@/components/Avatar';
import Colors from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import { Feather } from '@expo/vector-icons';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { EditProfileModal } from './EditProfileModal';

const AccountSection: React.FC = () => {
  const [isEditProfileVisible, setIsEditProfileVisible] = useState(false);
  const { user } = useAuth();

  console.log(user);
  return (
    <View style={styles.card}>
      <EditProfileModal
        isVisible={isEditProfileVisible}
        onClose={() => setIsEditProfileVisible(false)}
      />
      {/* Header */}
      <View style={styles.header}>
        <Feather name="user" size={18} color="#555" />
        <Text style={styles.headerTitle}>Account</Text>
      </View>

      {/* User Info Row */}
      <View style={styles.userInfoRow}>
        {/* Avatar Placeholder */}
        <View style={styles.avatarPlaceholder}>
          <Avatar avatarUrl={user?.avatar_url} size={60} />
        </View>

        {/* Text Details */}
        <View style={styles.textDetails}>
          <Text style={styles.userName}>{user?.full_name}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          {user?.created_at && (
            <Text style={styles.memberSince}>
              Member since {format(new Date(user?.created_at), 'MMM d, yyyy')}
            </Text>
          )}
        </View>

        {/* Edit Button */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            setIsEditProfileVisible(true);
          }}
        >
          <Feather name="edit-2" size={16} color="#333" />
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF', // Soft off-white background
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0F0F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textDetails: {
    flex: 1,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  memberSince: {
    fontSize: 12,
    color: '#8A8A8A',
    marginTop: 4,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.buttonBorderColor,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  editButtonText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 6,
    fontWeight: '500',
  },
});

export default AccountSection;
