import React from 'react';
import { FlatList, StyleSheet, RefreshControl } from 'react-native';
import { PostCard } from './PostCard';
import { useTheme } from '@/utils/ThemeContext';

interface Post {
  id: string;
  username: string;
  userAvatar: string;
  timestamp: string;
  content: string;
  images: string[];
  likes: number;
  comments: number;
  isLiked?: boolean;
}

interface PostListProps {
  posts: Post[];
  refreshing?: boolean;
  onRefresh?: () => void;
  onLike?: (id: string) => void;
  onComment?: (id: string) => void;
  onShare?: (id: string) => void;
  onOptions?: (id: string) => void;
}

export function PostList({ 
  posts, 
  refreshing = false,
  onRefresh,
  onLike,
  onComment,
  onShare,
  onOptions
}: PostListProps) {
  const { colors } = useTheme();
  
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PostCard 
          post={item} 
          onLike={onLike}
          onComment={onComment}
          onShare={onShare}
          onOptions={onOptions}
        />
      )}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.primary}
          colors={[colors.primary]}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: 8,
    paddingBottom: 20,
  },
});