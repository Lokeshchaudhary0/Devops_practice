import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';

interface OfferCardProps {
  offer: {
    id: string;
    title: string;
    description: string;
    image: string;
    color: string;
  };
}

const { width } = Dimensions.get('window');

export default function OfferCard({ offer }: OfferCardProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: offer.color }]}
      activeOpacity={0.9}
    >
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: colors.secondary }]} numberOfLines={2}>
            {offer.title}
          </Text>
          <Text style={[styles.description, { color: colors.secondary }]} numberOfLines={1}>
            {offer.description}
          </Text>
        </View>
        <Image source={{ uri: offer.image }} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  content: {
    flexDirection: 'row',
    padding: 16,
  },
  textContainer: {
    flex: 2,
    justifyContent: 'center',
    paddingRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
  },
  image: {
    flex: 1,
    height: 80,
    borderRadius: 8,
    resizeMode: 'cover',
  }
});