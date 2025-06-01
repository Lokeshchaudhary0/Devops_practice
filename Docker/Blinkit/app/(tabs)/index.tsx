import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { products, categories, offers, recentSearches } from '@/constants/MockData';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import OfferCard from '@/components/OfferCard';
import SearchBar from '@/components/SearchBar';
import DeliveryInfo from '@/components/DeliveryInfo';
import { useAuth } from '@/context/AuthContext';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { getDefaultAddress } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState('');
  const defaultAddress = getDefaultAddress();

  const featuredProducts = products.slice(0, 6);
  const topCategories = categories.slice(0, 6);

  const renderCategoryItem = ({ item }: { item: typeof categories[0] }) => (
    <CategoryCard category={item} />
  );

  const renderProductItem = ({ item }: { item: typeof products[0] }) => (
    <ProductCard product={item} />
  );

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleRecentSearch = (query: string) => {
    setSearchQuery(query);
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleAddressPress = () => {
    // In a full app, this would navigate to an address selection screen
    console.log('Navigate to address selection');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <DeliveryInfo 
        address={defaultAddress?.address || '123 Main St, New York'} 
        deliveryTime="10 minutes" 
        onAddressPress={handleAddressPress}
      />
      
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmit={handleSearch}
        placeholder="Search for atta, milk, eggs and more..."
      />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg' }}
            style={styles.heroBannerImage}
          />
          <View style={styles.heroBannerOverlay}>
            <Text style={styles.heroBannerTitle}>Groceries delivered in 10 minutes</Text>
            <Text style={styles.heroBannerSubtitle}>All your daily needs at your doorstep</Text>
          </View>
        </View>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Searches</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recentSearchesContainer}>
              {recentSearches.map((search, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.recentSearchItem, { backgroundColor: colors.subtle, borderColor: colors.border }]}
                  onPress={() => handleRecentSearch(search)}
                >
                  <Text style={{ color: colors.text }}>{search}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Offers */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Offers & Discounts</Text>
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Shop by Category</Text>
            <TouchableOpacity onPress={() => router.push('/categories')}>
              <Text style={[styles.viewAll, { color: colors.primary }]}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={topCategories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
          />
        </View>

        {/* Featured Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Featured Products</Text>
            <TouchableOpacity>
              <Text style={[styles.viewAll, { color: colors.primary }]}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.productGrid}>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </View>
        </View>

        {/* Delivery Promise */}
        <View style={[styles.deliveryPromiseContainer, { backgroundColor: colors.primary }]}>
          <View style={styles.deliveryPromiseContent}>
            <Text style={[styles.deliveryPromiseTitle, { color: colors.secondary }]}>
              Get it in 10 minutes
            </Text>
            <Text style={[styles.deliveryPromiseDescription, { color: colors.secondary }]}>
              We deliver your orders in 10 minutes or less, guaranteed!
            </Text>
          </View>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/7706623/pexels-photo-7706623.jpeg' }}
            style={styles.deliveryPromiseImage}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  heroBanner: {
    height: 180,
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  heroBannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroBannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  heroBannerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  heroBannerSubtitle: {
    fontSize: 16,
    color: 'white',
  },
  section: {
    marginVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '500',
  },
  categoryList: {
    paddingHorizontal: 16,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  recentSearchesContainer: {
    marginTop: 8,
    paddingLeft: 16,
  },
  recentSearchItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 16,
    borderWidth: 1,
  },
  deliveryPromiseContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  deliveryPromiseContent: {
    flex: 2,
    padding: 16,
    justifyContent: 'center',
  },
  deliveryPromiseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  deliveryPromiseDescription: {
    fontSize: 14,
  },
  deliveryPromiseImage: {
    flex: 1,
    height: 120,
  },
});