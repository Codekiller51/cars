import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { useTheme } from '@/utils/ThemeContext';

interface PostCardProps {
  post: {
    id: string;
    username: string;
    userAvatar: string;
    timestamp: string;
    content: string;
    images: string[];
    likes: number;
    comments: number;
    isLiked?: boolean;
  };
  onLike?: (id: string) => void;
  onComment?: (id: string) => void;
  onShare?: (id: string) => void;
  onOptions?: (id: string) => void;
}

export function PostCard({ post, onLike, onComment, onShare, onOptions }: PostCardProps) {
  const { colors } = useTheme();

  return (
    <Card style={styles.container}>
      {/* Post Header */}
      <View style={styles.header}>
        <Image source={{ uri: post.userAvatar }} style={styles.avatar} />
        <View style={styles.headerText}>
          <Text style={[styles.username, { color: colors.text }]}>{post.username}</Text>
          <Text style={[styles.timestamp, { color: colors.textSecondary }]}>{post.timestamp}</Text>
        </View>
        <TouchableOpacity 
          style={styles.optionsButton}
          onPress={() => onOptions?.(post.id)}
        >
          <MoreHorizontal size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
      
      {/* Post Content */}
      <Text style={[styles.content, { color: colors.text }]}>{post.content}</Text>
      
      {/* Post Images */}
      {post.images.length > 0 && (
        <View style={styles.imageContainer}>
          {post.images.length === 1 ? (
            <Image 
              source={{ uri: post.images[0] }} 
              style={styles.singleImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.multipleImages}>
              {post.images.slice(0, 4).map((image, index) => (
                <Image 
                  key={index}
                  source={{ uri: image }} 
                  style={[
                    styles.gridImage,
                    post.images.length === 3 && index === 0 && styles.largeGridImage,
                  ]}
                  resizeMode="cover"
                />
              ))}
              {post.images.length > 4 && (
                <View style={styles.moreImagesOverlay}>
                  <Text style={styles.moreImagesText}>+{post.images.length - 4}</Text>
                </View>
              )}
            </View>
          )}
        </View>
      )}
      
      {/* Post Actions */}
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => onLike?.(post.id)}
        >
          <Heart 
            size={20} 
            color={post.isLiked ? colors.primary : colors.textSecondary} 
            fill={post.isLiked ? colors.primary : 'transparent'}
          />
          <Text 
            style={[
              styles.actionText, 
              { color: post.isLiked ? colors.primary : colors.textSecondary }
            ]}
          >
            {post.likes}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => onComment?.(post.id)}
        >
          <MessageCircle size={20} color={colors.textSecondary} />
          <Text style={[styles.actionText, { color: colors.textSecondary }]}>
            {post.comments}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => onShare?.(post.id)}
        >
          <Share2 size={20} color={colors.textSecondary} />
          <Text style={[styles.actionText, { color: colors.textSecondary }]}>
            Share
          </Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    padding: 0,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerText: {
    marginLeft: 10,
    flex: 1,
  },
  username: {
    fontWeight: '600',
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
  },
  optionsButton: {
    padding: 4,
  },
  content: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    fontSize: 15,
    lineHeight: 22,
  },
  imageContainer: {
    width: '100%',
  },
  singleImage: {
    width: '100%',
    height: 300,
    borderRadius: 0,
  },
  multipleImages: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 240,
  },
  gridImage: {
    width: '50%',
    height: '50%',
    borderWidth: 1,
    borderColor: 'white',
  },
  largeGridImage: {
    width: '100%',
    height: '50%',
  },
  moreImagesOverlay: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: '50%',
    height: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreImagesText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    paddingVertical: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
  },
});