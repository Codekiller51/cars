import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '@/components/ui/Card';
import { MapPin, Calendar, Clock, Users } from 'lucide-react-native';
import { useTheme } from '@/utils/ThemeContext';

interface EventCardProps {
  event: {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    image: string;
    attendees: number;
    isAttending?: boolean;
  };
  onPress?: (id: string) => void;
  onAttend?: (id: string) => void;
}

export function EventCard({ event, onPress, onAttend }: EventCardProps) {
  const { colors } = useTheme();

  return (
    <Card style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => onPress?.(event.id)}
      >
        {/* Event Image */}
        <Image 
          source={{ uri: event.image }} 
          style={styles.image}
          resizeMode="cover"
        />
        
        {/* Event Type Tag */}
        <View style={[styles.tag, { backgroundColor: colors.primary }]}>
          <Text style={styles.tagText}>Car Meet</Text>
        </View>
        
        <View style={styles.content}>
          {/* Event Title */}
          <Text style={[styles.title, { color: colors.text }]}>{event.title}</Text>
          
          {/* Event Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Calendar size={16} color={colors.primary} />
              <Text style={[styles.detailText, { color: colors.textSecondary }]}>{event.date}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Clock size={16} color={colors.primary} />
              <Text style={[styles.detailText, { color: colors.textSecondary }]}>{event.time}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <MapPin size={16} color={colors.primary} />
              <Text 
                style={[styles.detailText, { color: colors.textSecondary }]}
                numberOfLines={1}
              >
                {event.location}
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <Users size={16} color={colors.primary} />
              <Text style={[styles.detailText, { color: colors.textSecondary }]}>
                {event.attendees} attending
              </Text>
            </View>
          </View>
          
          {/* Attend Button */}
          <TouchableOpacity 
            style={[
              styles.attendButton, 
              { backgroundColor: event.isAttending ? colors.success : colors.primary }
            ]}
            onPress={() => onAttend?.(event.id)}
          >
            <Text style={styles.attendButtonText}>
              {event.isAttending ? 'Attending' : 'Attend'}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    padding: 0,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  tag: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  detailsContainer: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
  },
  attendButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  attendButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});