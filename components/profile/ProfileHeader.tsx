import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Settings, Edit, Car, Trophy, Camera } from 'lucide-react-native';
import { useTheme } from '@/utils/ThemeContext';

interface ProfileHeaderProps {
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    coverPhoto: string;
    bio: string;
    carsCount: number;
    awardsCount: number;
    photosCount: number;
  };
  onEditProfile?: () => void;
  onSettings?: () => void;
}

export function ProfileHeader({ user, onEditProfile, onSettings }: ProfileHeaderProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {/* Cover Photo */}
      <Image 
        source={{ uri: user.coverPhoto }} 
        style={styles.coverPhoto}
        resizeMode="cover"
      />
      
      {/* Settings Button */}
      <TouchableOpacity 
        style={[styles.settingsButton, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}
        onPress={onSettings}
      >
        <Settings size={20} color="white" />
      </TouchableOpacity>
      
      {/* Profile Info */}
      <View style={styles.profileInfo}>
        {/* Avatar */}
        <Image 
          source={{ uri: user.avatar }} 
          style={styles.avatar}
        />
        
        {/* User Info */}
        <View style={styles.userInfo}>
          <Text style={[styles.name, { color: colors.text }]}>{user.name}</Text>
          <Text style={[styles.username, { color: colors.textSecondary }]}>@{user.username}</Text>
        </View>
        
        {/* Edit Profile Button */}
        <TouchableOpacity 
          style={[styles.editButton, { borderColor: colors.primary }]}
          onPress={onEditProfile}
        >
          <Edit size={16} color={colors.primary} />
          <Text style={[styles.editButtonText, { color: colors.primary }]}>Edit</Text>
        </TouchableOpacity>
      </View>
      
      {/* Bio */}
      {user.bio && (
        <Text style={[styles.bio, { color: colors.text }]}>{user.bio}</Text>
      )}
      
      {/* Stats */}
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Car size={20} color={colors.primary} />
          <Text style={[styles.statCount, { color: colors.text }]}>{user.carsCount}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Cars</Text>
        </View>
        
        <View style={styles.statItem}>
          <Trophy size={20} color={colors.primary} />
          <Text style={[styles.statCount, { color: colors.text }]}>{user.awardsCount}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Awards</Text>
        </View>
        
        <View style={styles.statItem}>
          <Camera size={20} color={colors.primary} />
          <Text style={[styles.statCount, { color: colors.text }]}>{user.photosCount}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Photos</Text>
        </View>
      </View>
      
      {/* Divider */}
      <View style={[styles.divider, { backgroundColor: colors.border }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  coverPhoto: {
    width: '100%',
    height: 180,
  },
  settingsButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: -40,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'white',
  },
  userInfo: {
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
  },
  username: {
    fontSize: 14,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  editButtonText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  bio: {
    marginTop: 16,
    paddingHorizontal: 16,
    fontSize: 14,
    lineHeight: 20,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statCount: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  divider: {
    height: 1,
    marginTop: 16,
  },
});