import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, SafeAreaView } from 'react-native';
import { categories } from '@/constants/MockData';
import CategoryCard from '@/components/CategoryCard';
import SearchBar from '@/components/SearchBar';
import DeliveryInfo from '@/components/DeliveryInfo';
import { useAuth } from '@/context/AuthContext';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';

export default function CategoriesScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [searchQuery, setSearchQuery] = useState('');
  const { getDefaultAddress } = useAuth();
  
  const defaultAddress = getDefaultAddress();
  
  const filteredCategories = searchQuery
    ? categories.filter(category => 
        category.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : categories;
  
  const renderItem = ({ item }: { item: typeof categories[0] }) => (
    <CategoryCard category={item} size="large" />
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <DeliveryInfo 
        address={defaultAddress?.address || '123 Main St, New York'} 
        deliveryTime="10 minutes" 
      />
      
      <Text style={[styles.heading, { color: colors.text }]}>Categories</Text>
      
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search categories..."
      />
      
      <FlatList
        data={filteredCategories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.text }]}>
              No categories found
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  gridContainer: {
    padding: 8,
    paddingBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});