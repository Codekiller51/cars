import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';
import { CompetitionCard } from '@/components/competitions/CompetitionCard';
import { useTheme } from '@/utils/ThemeContext';

// Mock data for competitions
const MOCK_COMPETITIONS = [
  {
    id: '1',
    title: 'Best Modified JDM Car',
    description: 'Submit photos of your modified Japanese car for a chance to win prizes from our sponsors!',
    image: 'https://images.pexels.com/photos/8134632/pexels-photo-8134632.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    endDate: 'June 30, 2025',
    participants: 342,
    prizes: [
      '1st Place: $500 Gift Card to TopTuner Parts',
      '2nd Place: Full Detailing Package',
      '3rd Place: Custom Shift Knob'
    ],
    isParticipating: true
  },
  {
    id: '2',
    title: 'Track Time Challenge',
    description: 'Submit your best lap time at any approved track. Open to all vehicle classes!',
    image: 'https://images.pexels.com/photos/12801400/pexels-photo-12801400.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    endDate: 'July 15, 2025',
    participants: 124,
    prizes: [
      '1st Place: Free Track Day + Coaching Session',
      '2nd Place: Set of Track Tires',
      '3rd Place: GoPro Camera'
    ]
  },
  {
    id: '3',
    title: 'Best Car Photography',
    description: 'Show off your automotive photography skills! Any car, any setting.',
    image: 'https://images.pexels.com/photos/3608542/pexels-photo-3608542.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    endDate: 'July 5, 2025',
    participants: 567,
    prizes: [
      '1st Place: Professional Camera Lens',
      '2nd Place: Editing Software License',
      '3rd Place: Photography Book Collection'
    ]
  }
];

export default function CompetitionsScreen() {
  const { colors } = useTheme();
  const [competitions, setCompetitions] = useState(MOCK_COMPETITIONS);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate network request
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const handleParticipate = (id: string) => {
    setCompetitions(prevCompetitions => 
      prevCompetitions.map(competition => 
        competition.id === id 
          ? { 
              ...competition, 
              isParticipating: !competition.isParticipating, 
              participants: competition.isParticipating 
                ? competition.participants - 1 
                : competition.participants + 1 
            } 
          : competition
      )
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Competitions</Text>
      </View>
      
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <View style={[styles.tabButton, styles.activeTab, { borderBottomColor: colors.primary }]}>
          <Text style={[styles.tabText, styles.activeTabText, { color: colors.primary }]}>
            Active
          </Text>
        </View>
        <View style={styles.tabButton}>
          <Text style={[styles.tabText, { color: colors.textSecondary }]}>
            My Entries
          </Text>
        </View>
        <View style={styles.tabButton}>
          <Text style={[styles.tabText, { color: colors.textSecondary }]}>
            Past
          </Text>
        </View>
      </View>

      {/* Competitions List */}
      <FlatList
        data={competitions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CompetitionCard 
            competition={item} 
            onPress={(id) => console.log(`View competition ${id}`)}
            onParticipate={handleParticipate}
          />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  tabButton: {
    paddingVertical: 12,
    marginRight: 24,
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  activeTabText: {
    fontWeight: '600',
  },
  listContainer: {
    paddingTop: 16,
    paddingBottom: 20,
  },
});