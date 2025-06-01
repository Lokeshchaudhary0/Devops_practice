import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  Dimensions
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Heart, ArrowLeft, CircleMinus as MinusCircle, CirclePlus as PlusCircle, Clock } from 'lucide-react-native';
import { products } from '@/constants/MockData';
import { useCart } from '@/context/CartContext';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';

const { width } = Dimensions.get('window');

export default function ProductScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { addToCart, removeFromCart, getItemQuantity } = useCart();
  
  const product = products.find((p) => p.id === id);
  
  if (!product) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Stack.Screen options={{ 
          headerShown: true,
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <ArrowLeft size={24} color={colors.text} />
            </TouchableOpacity>
          )
        }} />
        <View style={styles.notFoundContainer}>
          <Text style={[styles.notFoundText, { color: colors.text }]}>Product not found</Text>
          <TouchableOpacity
            style={[styles.goBackButton, { backgroundColor: colors.primary }]}
            onPress={() => router.back()}
          >
            <Text style={[styles.goBackButtonText, { color: colors.secondary }]}>
              Go Back
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  const quantity = getItemQuantity(product.id);
  
  // Find similar products (same category, excluding current product)
  const similarProducts = products.filter(
    p => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ 
        headerShown: true,
        headerTitle: '',
        headerTransparent: true,
        headerLeft: () => (
          <TouchableOpacity 
            onPress={() => router.back()}
            style={[styles.backButton, { backgroundColor: `${colors.background}80` }]}
          >
            <ArrowLeft size={20} color={colors.text} />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity style={[styles.wishlistButton, { backgroundColor: `${colors.background}80` }]}>
            <Heart size={20} color={colors.error} />
          </TouchableOpacity>
        )
      }} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
          {product.discount && (
            <View style={[styles.discountBadge, { backgroundColor: colors.discount }]}>
              <Text style={styles.discountText}>{product.discount}% OFF</Text>
            </View>
          )}
          <View style={[styles.deliveryBadge, { backgroundColor: colors.primary }]}>
            <Clock size={14} color={colors.secondary} style={styles.clockIcon} />
            <Text style={[styles.deliveryText, { color: colors.secondary }]}>
              10 min delivery
            </Text>
          </View>
        </View>
        
        <View style={styles.productDetails}>
          <Text style={[styles.productName, { color: colors.text }]}>{product.name}</Text>
          <Text style={[styles.productUnit, { color: colors.tabIconDefault }]}>
            {product.unit}
          </Text>
          
          <View style={styles.priceContainer}>
            <Text style={[styles.productPrice, { color: colors.text }]}>
              ₹{product.price}
            </Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
            )}
            {product.discount && (
              <Text style={[styles.discountPercent, { color: colors.success }]}>
                {product.discount}% off
              </Text>
            )}
          </View>
          
          {!product.inStock && (
            <View style={[styles.outOfStockBadge, { backgroundColor: `${colors.error}10` }]}>
              <Text style={[styles.outOfStockText, { color: colors.error }]}>
                Out of Stock
              </Text>
            </View>
          )}
        </View>
        
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        
        <View style={styles.descriptionContainer}>
          <Text style={[styles.descriptionTitle, { color: colors.text }]}>
            About the Product
          </Text>
          <Text style={[styles.descriptionText, { color: colors.text }]}>
            {product.description}
          </Text>
        </View>
        
        {similarProducts.length > 0 && (
          <View style={styles.similarProductsContainer}>
            <Text style={[styles.similarProductsTitle, { color: colors.text }]}>
              Similar Products
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {similarProducts.map((item) => (
                <View key={item.id} style={styles.similarProductCard}>
                  <TouchableOpacity
                    onPress={() => {
                      router.push(`/product/${item.id}`);
                    }}
                    activeOpacity={0.8}
                  >
                    <Image source={{ uri: item.image }} style={styles.similarProductImage} />
                    <Text style={[styles.similarProductName, { color: colors.text }]} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text style={[styles.similarProductPrice, { color: colors.text }]}>
                      ₹{item.price}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>
      
      <View style={[styles.bottomBar, { backgroundColor: colors.cardBackground, borderTopColor: colors.border }]}>
        {quantity > 0 ? (
          <View style={styles.quantityControls}>
            <TouchableOpacity
              onPress={() => removeFromCart(product.id)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <MinusCircle size={32} color={colors.primary} />
            </TouchableOpacity>
            <Text style={[styles.quantityText, { color: colors.text }]}>
              {quantity}
            </Text>
            <TouchableOpacity
              onPress={() => addToCart(product)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <PlusCircle size={32} color={colors.primary} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.addToCartButton, { backgroundColor: colors.primary }]}
            onPress={() => addToCart(product)}
            disabled={!product.inStock}
          >
            <Text style={[styles.addToCartText, { color: colors.secondary }]}>
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
    marginTop: 8,
  },
  wishlistButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    marginTop: 8,
  },
  imageContainer: {
    width: width,
    height: width,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 1,
  },
  discountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  deliveryBadge: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  clockIcon: {
    marginRight: 4,
  },
  deliveryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  productDetails: {
    padding: 16,
  },
  productName: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 4,
  },
  productUnit: {
    fontSize: 16,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: '#86939E',
    marginRight: 8,
  },
  discountPercent: {
    fontSize: 16,
    fontWeight: '500',
  },
  outOfStockBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginTop: 12,
  },
  outOfStockText: {
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    height: 8,
  },
  descriptionContainer: {
    padding: 16,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
  },
  similarProductsContainer: {
    padding: 16,
  },
  similarProductsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  similarProductCard: {
    width: 120,
    marginRight: 16,
  },
  similarProductImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  similarProductName: {
    fontSize: 14,
    marginBottom: 4,
  },
  similarProductPrice: {
    fontSize: 14,
    fontWeight: '600',
  },
  bottomBar: {
    padding: 16,
    borderTopWidth: 1,
  },
  addToCartButton: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  quantityText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  notFoundText: {
    fontSize: 18,
    marginBottom: 16,
  },
  goBackButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  goBackButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});