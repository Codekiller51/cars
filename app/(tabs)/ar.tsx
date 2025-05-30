import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/utils/ThemeContext';
import { Camera, Zap, Layers, Share2 } from 'lucide-react-native';

export default function ARScreen() {
  const { colors } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('wheels');
  
  const categories = [
    { id: 'wheels', name: 'Wheels', icon: <Layers size={20} color={colors.primary} /> },
    { id: 'paint', name: 'Paint', icon: <Layers size={20} color={colors.primary} /> },
    { id: 'body', name: 'Body Kits', icon: <Layers size={20} color={colors.primary} /> },
    { id: 'lights', name: 'Lights', icon: <Layers size={20} color={colors.primary} /> },
  ];
  
  // Mock wheels data
  const wheels = [
    { id: '1', name: 'Sport RS-7', price: '$1,200', image: 'https://images.pexels.com/photos/3849554/pexels-photo-3849554.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { id: '2', name: 'Race GT-9', price: '$1,450', image: 'https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { id: '3', name: 'Luxe X10', price: '$1,800', image: 'https://images.pexels.com/photos/244553/pexels-photo-244553.jpeg?auto=compress&cs=tinysrgb&w=300' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>AR Garage</Text>
        <Button 
          title="Scan My Car"
          variant="filled"
          size="small"
          leftIcon={<Camera size={16} color="white" />}
          buttonStyle={styles.scanButton}
        />
      </View>
      
      {/* Preview */}
      <View style={styles.previewContainer}>
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }} 
          style={styles.previewImage}
          resizeMode="cover"
        />
        
        {/* AR Overlay */}
        <View style={styles.arOverlay}>
          <View style={styles.arStatusBadge}>
            <Zap size={14} color="white" />
            <Text style={styles.arStatusText}>AR Active</Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.shareButton, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}
          >
            <Share2 size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Category Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContainer}
      >
        {categories.map(category => (
          <TouchableOpacity 
            key={category.id}
            style={[
              styles.categoryTab,
              selectedCategory === category.id && { 
                backgroundColor: colors.primary + '20', // 20% opacity
                borderColor: colors.primary,
              }
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            {category.icon}
            <Text 
              style={[
                styles.categoryText,
                { color: selectedCategory === category.id ? colors.primary : colors.textSecondary }
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Options */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.optionsContainer}
      >
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Select Wheels
        </Text>
        
        {wheels.map(wheel => (
          <Card key={wheel.id} style={styles.optionCard}>
            <View style={styles.optionContent}>
              <Image 
                source={{ uri: wheel.image }} 
                style={styles.optionImage}
                resizeMode="cover"
              />
              <View style={styles.optionInfo}>
                <Text style={[styles.optionTitle, { color: colors.text }]}>{wheel.name}</Text>
                <Text style={[styles.optionPrice, { color: colors.textSecondary }]}>{wheel.price}</Text>
                <Button 
                  title="Apply"
                  variant="outlined"
                  size="small"
                  buttonStyle={styles.applyButton}
                />
              </View>
            </View>
          </Card>
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
  scanButton: {
    paddingHorizontal: 12,
  },
  previewContainer: {
    marginHorizontal: 16,
    height: 240,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  arOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 12,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  arStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  arStatusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  shareButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  categoryText: {
    marginLeft: 8,
    fontWeight: '500',
  },
  optionsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  optionCard: {
    padding: 0,
    marginBottom: 12,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  optionInfo: {
    flex: 1,
    marginLeft: 12,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  optionPrice: {
    fontSize: 14,
    marginBottom: 8,
  },
  applyButton: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
});