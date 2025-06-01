import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Category } from '@/constants/MockData';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';

interface CategoryCardProps {
  category: Category;
  size?: 'small' | 'large';
}

export default function CategoryCard({ category, size = 'small' }: CategoryCardProps) {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  const handleCategoryPress = () => {
    router.push(`/categories/${category.id}`);
  };

  return (
    <TouchableOpacity
      style={[
        styles.container, 
        size === 'large' ? styles.largeContainer : styles.smallContainer,
        { backgroundColor: colors.cardBackground, borderColor: colors.border }
      ]}
      onPress={handleCategoryPress}
      activeOpacity={0.8}
    >
      <Image 
        source={{ uri: category.image }} 
        style={size === 'large' ? styles.largeImage : styles.smallImage} 
      />
      <View style={styles.overlay} />
      <Text 
        style={[
          styles.name, 
          size === 'large' ? styles.largeName : styles.smallName,
          { color: colors.background }
        ]}
        numberOfLines={2}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
  },
  smallContainer: {
    width: 100,
    height: 100,
    marginRight: 8,
  },
  largeContainer: {
    width: '48%',
    height: 120,
    margin: '1%',
  },
  smallImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  largeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  name: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  smallName: {
    fontSize: 12,
  },
  largeName: {
    fontSize: 16,
  }
});