import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { CircleMinus as MinusCircle, CirclePlus as PlusCircle } from 'lucide-react-native';
import { Product } from '@/constants/MockData';
import { useCart } from '@/context/CartContext';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';

interface ProductCardProps {
  product: Product;
  showAddButton?: boolean;
}

export default function ProductCard({ product, showAddButton = true }: ProductCardProps) {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { addToCart, removeFromCart, getItemQuantity } = useCart();
  
  const quantity = getItemQuantity(product.id);
  
  const handleProductPress = () => {
    router.push(`/product/${product.id}`);
  };

  const discountPercentage = product.discount ? 
    `${product.discount}% OFF` : '';

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}
      onPress={handleProductPress}
      activeOpacity={0.8}
    >
      {product.discount && (
        <View style={[styles.discountBadge, { backgroundColor: colors.discount }]}>
          <Text style={styles.discountText}>{discountPercentage}</Text>
        </View>
      )}

      <Image source={{ uri: product.image }} style={styles.image} />
      
      <View style={styles.detailsContainer}>
        <Text style={[styles.price, { color: colors.text }]}>
          ₹{product.price}
          {product.originalPrice && (
            <Text style={styles.originalPrice}> ₹{product.originalPrice}</Text>
          )}
        </Text>
        <Text style={[styles.name, { color: colors.text }]} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={[styles.unit, { color: colors.tabIconDefault }]}>{product.unit}</Text>
      </View>
      
      {showAddButton && (
        <View style={styles.addButtonContainer}>
          {quantity > 0 ? (
            <View style={styles.quantityContainer}>
              <TouchableOpacity 
                onPress={() => removeFromCart(product.id)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <MinusCircle size={24} color={colors.primary} />
              </TouchableOpacity>
              <Text style={[styles.quantityText, { color: colors.text }]}>{quantity}</Text>
              <TouchableOpacity 
                onPress={() => addToCart(product)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <PlusCircle size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: colors.subtle, borderColor: colors.border }]}
              onPress={() => addToCart(product)}
            >
              <Text style={[styles.addButtonText, { color: colors.text }]}>ADD</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 160,
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    minHeight: 40,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  originalPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    color: '#86939E',
    marginLeft: 4,
  },
  unit: {
    fontSize: 12,
    marginBottom: 8,
  },
  addButtonContainer: {
    padding: 8,
    alignItems: 'center',
  },
  addButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 1,
    width: '100%',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 1,
  },
  discountText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 8,
  }
});