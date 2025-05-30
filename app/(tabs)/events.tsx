import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';
import { EventCard } from '@/components/events/EventCard';
import { useTheme } from '@/utils/ThemeContext';
import { Button } from '@/components/ui/Button';
import { MapPin, Plus } from 'lucide-react-native';

// Mock data for events
const MOCK_EVENTS = [
  {
    id: '1',
    title: 'Sunday Morning Cars & Coffee',
    date: 'June 12, 2025',
    time: '8:00 AM - 11:00 AM',
    location: 'Riverside Park, Downtown',
    image: 'https://images.pexels.com/photos/13889624/pexels-photo-13889624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    attendees: 156,
    isAttending: true
  },
  {
    id: '2',
    title: 'Track Day: Beginners Welcome',
    date: 'June 18, 2025',
    time: '9:00 AM - 4:00 PM',
    location: 'Willow Springs Raceway',
    image: 'https://images.pexels.com/photos/9385044/pexels-photo-9385044.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    attendees: 42
  },
  {
    id: '3',
    title: 'Sunset Cruise & Photoshoot',
    date: 'June 25, 2025',
    time: '6:00 PM - 9:00 PM',
    location: 'Pacific Coast Highway',
    image: 'https://images.pexels.com/photos/10588756/pexels-photo-10588756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    attendees: 78
  },
  {
    id: '4',
    title: 'Euro Car Festival',
    date: 'July 2, 2025',
    time: '10:00 AM - 6:00 PM',
    location: 'City Convention Center',
    image: 'https://images.pexels.com/photos/11739092/pexels-photo-11739092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    attendees: 312
  }
];

export default function EventsScreen() {
  const { colors } = useTheme();
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate network request
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const handleAttend = (id: string) => {
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === id 
          ? { 
              ...event, 
              isAttending: !event.isAttending, 
              attendees: event.isAttending ? event.attendees - 1 : event.attendees + 1 
            } 
          : event
      )
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Events</Text>
        <Button 
          title="Create"
          variant="filled"
          size="small"
          leftIcon={<Plus size={16} color="white" />}
          buttonStyle={styles.createButton}
        />
      </View>
      
      {/* Near Me Button */}
      <View style={styles.nearMeContainer}>
        <Button 
          title="Events Near Me"
          variant="outlined"
          leftIcon={<MapPin size={16} color={colors.primary} />}
          buttonStyle={styles.nearMeButton}
        />
      </View>

      {/* Events List */}
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard 
            event={item} 
            onPress={(id) => console.log(`View event ${id}`)}
            onAttend={handleAttend}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  createButton: {
    paddingHorizontal: 12,
  },
  nearMeContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  nearMeButton: {
    width: '100%',
  },
  listContainer: {
    paddingTop: 8,
    paddingBottom: 20,
  },
});