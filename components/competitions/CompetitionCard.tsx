import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '@/components/ui/Card';
import { Timer, Trophy, Users } from 'lucide-react-native';
import { useTheme } from '@/utils/ThemeContext';

interface CompetitionCardProps {
  competition: {
    id: string;
    title: string;
    description: string;
    image: string;
    endDate: string;
    participants: number;
    prizes: string[];
    isParticipating?: boolean;
  };
  onPress?: (id: string) => void;
  onParticipate?: (id: string) => void;
}

export function CompetitionCard({ competition, onPress, onParticipate }: CompetitionCardProps) {
  const { colors } = useTheme();

  return (
    <Card style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => onPress?.(competition.id)}
      >
        {/* Competition Image */}
        <Image 
          source={{ uri: competition.image }} 
          style={styles.image}
          resizeMode="cover"
        />
        
        <View style={styles.content}>
          {/* Competition Title */}
          <Text style={[styles.title, { color: colors.text }]}>{competition.title}</Text>
          
          {/* Competition Description */}
          <Text 
            style={[styles.description, { color: colors.textSecondary }]}
            numberOfLines={2}
          >
            {competition.description}
          </Text>
          
          {/* Competition Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Timer size={16} color={colors.primary} />
              <Text style={[styles.detailText, { color: colors.textSecondary }]}>
                Ends {competition.endDate}
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <Users size={16} color={colors.primary} />
              <Text style={[styles.detailText, { color: colors.textSecondary }]}>
                {competition.participants} participants
              </Text>
            </View>
          </View>
          
          {/* Prizes */}
          <View style={styles.prizesContainer}>
            <View style={styles.prizeHeader}>
              <Trophy size={16} color={colors.primary} />
              <Text style={[styles.prizeHeaderText, { color: colors.text }]}>
                Prizes
              </Text>
            </View>
            
            {competition.prizes.map((prize, index) => (
              <Text 
                key={index} 
                style={[styles.prizeText, { color: colors.textSecondary }]}
              >
                • {prize}
              </Text>
            ))}
          </View>
          
          {/* Participate Button */}
          <TouchableOpacity 
            style={[
              styles.participateButton, 
              { backgroundColor: competition.isParticipating ? colors.success : colors.primary }
            ]}
            onPress={() => onParticipate?.(competition.id)}
          >
            <Text style={styles.participateButtonText}>
              {competition.isParticipating ? 'Participating' : 'Enter Competition'}
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
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
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
  prizesContainer: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
  },
  prizeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  prizeHeaderText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  prizeText: {
    marginLeft: 24,
    marginBottom: 4,
    fontSize: 14,
  },
  participateButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  participateButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});