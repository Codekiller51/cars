import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Heart, MessageCircle, Share2, MoveHorizontal as MoreHorizontal, Plus } from 'lucide-react-native';
import { useTheme } from '@/utils/ThemeContext';

const STORIES = [
  {
    id: '1',
    username: 'Your Story',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
    hasStory: false,
  },
  {
    id: '2',
    username: 'jdm_builds',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300',
    hasStory: true,
  },
  {
    id: '3',
    username: 'track_life',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=300',
    hasStory: true,
  },
  {
    id: '4',
    username: 'euro_cars',
    avatar: 'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=300',
    hasStory: true,
  },
];

const POSTS = [
  {
    id: '1',
    username: 'jdm_builds',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300',
    image: 'https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    caption: 'Finally finished the new setup! What do you think? 🔥 #JDM #CarLife',
    likes: 1234,
    comments: 89,
    timestamp: '2h ago',
  },
  {
    id: '2',
    username: 'track_life',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=300',
    image: 'https://images.pexels.com/photos/12801400/pexels-photo-12801400.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    caption: 'Perfect day for some track action! New PB set 🏁 #TrackDay #Racing',
    likes: 892,
    comments: 45,
    timestamp: '5h ago',
  },
];

export default function HomeScreen() {
  const { colors } = useTheme();
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const toggleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>CarCulture</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.storiesContainer}
          contentContainerStyle={styles.storiesContent}
        >
          {STORIES.map((story, index) => (
            <TouchableOpacity key={story.id} style={styles.storyItem}>
              <View style={[
                styles.storyRing,
                { borderColor: story.hasStory ? colors.primary : colors.border }
              ]}>
                <Image source={{ uri: story.avatar }} style={styles.storyAvatar} />
                {index === 0 && (
                  <View style={[styles.addStoryButton, { backgroundColor: colors.primary }]}>
                    <Plus size={14} color="white" />
                  </View>
                )}
              </View>
              <Text 
                style={[styles.storyUsername, { color: colors.text }]}
                numberOfLines={1}
              >
                {story.username}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Posts */}
        {POSTS.map(post => (
          <View 
            key={post.id} 
            style={[styles.post, { borderBottomColor: colors.border }]}
          >
            {/* Post Header */}
            <View style={styles.postHeader}>
              <View style={styles.postHeaderLeft}>
                <Image source={{ uri: post.avatar }} style={styles.postAvatar} />
                <View>
                  <Text style={[styles.postUsername, { color: colors.text }]}>
                    {post.username}
                  </Text>
                  <Text style={[styles.postTimestamp, { color: colors.textSecondary }]}>
                    {post.timestamp}
                  </Text>
                </View>
              </View>
              <TouchableOpacity>
                <MoreHorizontal size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            {/* Post Image */}
            <Image source={{ uri: post.image }} style={styles.postImage} />

            {/* Post Actions */}
            <View style={styles.postActions}>
              <View style={styles.postActionsLeft}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => toggleLike(post.id)}
                >
                  <Heart 
                    size={24} 
                    color={likedPosts.has(post.id) ? colors.primary : colors.text}
                    fill={likedPosts.has(post.id) ? colors.primary : 'transparent'}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <MessageCircle size={24} color={colors.text} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Share2 size={24} color={colors.text} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Post Info */}
            <View style={styles.postInfo}>
              <Text style={[styles.likesCount, { color: colors.text }]}>
                {post.likes.toLocaleString()} likes
              </Text>
              <View style={styles.captionContainer}>
                <Text style={[styles.caption, { color: colors.text }]}>
                  <Text style={styles.captionUsername}>{post.username}</Text>{' '}
                  {post.caption}
                </Text>
              </View>
              <TouchableOpacity>
                <Text style={[styles.commentsButton, { color: colors.textSecondary }]}>
                  View all {post.comments} comments
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  storiesContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  storiesContent: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 16,
  },
  storyItem: {
    alignItems: 'center',
    width: 72,
  },
  storyRing: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    padding: 2,
    marginBottom: 4,
  },
  storyAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 31,
  },
  addStoryButton: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  storyUsername: {
    fontSize: 11,
    textAlign: 'center',
  },
  post: {
    borderBottomWidth: 0.5,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  postHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  postAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  postUsername: {
    fontSize: 14,
    fontWeight: '600',
  },
  postTimestamp: {
    fontSize: 12,
  },
  postImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 4/3,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  postActionsLeft: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    padding: 2,
  },
  postInfo: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    gap: 6,
  },
  likesCount: {
    fontSize: 14,
    fontWeight: '600',
  },
  captionContainer: {
    flexDirection: 'row',
  },
  caption: {
    fontSize: 14,
    lineHeight: 18,
  },
  captionUsername: {
    fontWeight: '600',
  },
  commentsButton: {
    fontSize: 14,
  },
});