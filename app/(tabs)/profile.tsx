import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '@/utils/ThemeContext';
import { Grid2x2 as Grid, List, Bookmark, SquareUser as UserSquare } from 'lucide-react-native';

const PROFILE_DATA = {
  username: 'noargarage',
  name: 'No AR Garage',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
  bio: '🏎️ Automotive Culture & Community\n🔧 Building & Sharing Car Stories\n📸 Featured Builds & Events\n🌐 #NoARGarage',
  posts: 824,
  followers: '242K',
  following: 981,
  website: 'noargarage.com'
};

const POSTS = [
  'https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/8980889/pexels-photo-8980889.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/4700142/pexels-photo-4700142.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/4720464/pexels-photo-4720464.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/13889624/pexels-photo-13889624.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/10611994/pexels-photo-10611994.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/9396961/pexels-photo-9396961.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/10481412/pexels-photo-10481412.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/12801400/pexels-photo-12801400.jpeg?auto=compress&cs=tinysrgb&w=600'
];

export default function ProfileScreen() {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('grid');
  const windowWidth = Dimensions.get('window').width;
  const imageSize = (windowWidth - 4) / 3;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.username, { color: colors.text }]}>{PROFILE_DATA.username}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <Image source={{ uri: PROFILE_DATA.avatar }} style={styles.avatar} />
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: colors.text }]}>{PROFILE_DATA.posts}</Text>
              <Text style={[styles.statLabel, { color: colors.text }]}>posts</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: colors.text }]}>{PROFILE_DATA.followers}</Text>
              <Text style={[styles.statLabel, { color: colors.text }]}>followers</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: colors.text }]}>{PROFILE_DATA.following}</Text>
              <Text style={[styles.statLabel, { color: colors.text }]}>following</Text>
            </View>
          </View>
        </View>

        <View style={styles.bioSection}>
          <Text style={[styles.name, { color: colors.text }]}>{PROFILE_DATA.name}</Text>
          <Text style={[styles.bio, { color: colors.text }]}>{PROFILE_DATA.bio}</Text>
          <Text style={[styles.website, { color: colors.primary }]}>{PROFILE_DATA.website}</Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={[styles.editButton, { borderColor: colors.border }]}>
            <Text style={[styles.editButtonText, { color: colors.text }]}>Edit profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.editButton, { borderColor: colors.border }]}>
            <Text style={[styles.editButtonText, { color: colors.text }]}>Share profile</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.tabBar, { borderColor: colors.border }]}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'grid' && styles.activeTab]} 
            onPress={() => setActiveTab('grid')}
          >
            <Grid size={24} color={activeTab === 'grid' ? colors.text : colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'list' && styles.activeTab]} 
            onPress={() => setActiveTab('list')}
          >
            <List size={24} color={activeTab === 'list' ? colors.text : colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'saved' && styles.activeTab]} 
            onPress={() => setActiveTab('saved')}
          >
            <Bookmark size={24} color={activeTab === 'saved' ? colors.text : colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'tagged' && styles.activeTab]} 
            onPress={() => setActiveTab('tagged')}
          >
            <UserSquare size={24} color={activeTab === 'tagged' ? colors.text : colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.postsGrid}>
          {POSTS.map((post, index) => (
            <TouchableOpacity key={index} style={[styles.postContainer, { width: imageSize, height: imageSize }]}>
              <Image source={{ uri: post }} style={styles.postImage} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
  },
  profileSection: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
    marginRight: 28,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '600',
  },
  statLabel: {
    fontSize: 13,
  },
  bioSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  bio: {
    fontSize: 14,
    lineHeight: 20,
  },
  website: {
    fontSize: 14,
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  editButton: {
    flex: 1,
    height: 30,
    borderRadius: 6,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
  },
  postContainer: {
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
});