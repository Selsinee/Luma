import Colors from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Props for the Account Section component
interface AccountSectionProps {
  userName: string;
  userEmail: string;
  memberSince: string; // e.g., "January 15, 2024"
  onEditPress?: () => void; // Optional function for the Edit button
}

const AccountSection: React.FC<AccountSectionProps> = ({
  userName,
  userEmail,
  memberSince,
  onEditPress,
}) => {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Feather name="user" size={18} color="#555" />
        <Text style={styles.headerTitle}>Account</Text>
      </View>

      {/* User Info Row */}
      <View style={styles.userInfoRow}>
        {/* Avatar Placeholder */}
        <View style={styles.avatarPlaceholder}>
          <Feather name="user" size={30} color="#A9B0D2" />
        </View>

        {/* Text Details */}
        <View style={styles.textDetails}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
          <Text style={styles.memberSince}>Member since {memberSince}</Text>
        </View>

        {/* Edit Button */}
        <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
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
