import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView,
  Alert
} from 'react-native';
import { ShoppingBag } from 'lucide-react-native';
import CartItem from '@/components/CartItem';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';

export default function CartScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const { isAuthenticated, getDefaultAddress } = useAuth();
  
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  
  const deliveryFee = totalPrice > 0 ? (totalPrice < 500 ? 40 : 0) : 0;
  const totalAmount = totalPrice + deliveryFee;
  
  const defaultAddress = getDefaultAddress();
  
  const handlePlaceOrder = () => {
    if (!isAuthenticated) {
      // Navigate to login
      router.push('/profile');
      return;
    }
    
    if (!defaultAddress) {
      Alert.alert(
        'Address Required',
        'Please add a delivery address before placing an order',
        [
          { text: 'Add Address', onPress: () => router.push('/profile') },
          { text: 'Cancel', style: 'cancel' }
        ]
      );
      return;
    }
    
    setIsPlacingOrder(true);
    
    // Simulate order processing
    setTimeout(() => {
      Alert.alert(
        'Order Placed Successfully!',
        'Your order will be delivered in 10 minutes',
        [{ 
          text: 'Track Order', 
          onPress: () => {
            clearCart();
            router.push('/orders');
          }
        }]
      );
      setIsPlacingOrder(false);
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.heading, { color: colors.text }]}>Your Cart</Text>
        <View style={styles.emptyContainer}>
          <ShoppingBag size={60} color={colors.primary} />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>Your cart is empty</Text>
          <Text style={[styles.emptySubtitle, { color: colors.tabIconDefault }]}>
            Add items to your cart to place an order
          </Text>
          <TouchableOpacity
            style={[styles.shopButton, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/')}
          >
            <Text style={[styles.shopButtonText, { color: colors.secondary }]}>
              Browse Products
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.heading, { color: colors.text }]}>Your Cart</Text>
      
      <FlatList
        data={items}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.cartList}
      />
      
      <View style={[styles.footer, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
        <View style={styles.priceDetails}>
          <View style={styles.priceRow}>
            <Text style={[styles.priceLabel, { color: colors.text }]}>Subtotal</Text>
            <Text style={[styles.priceValue, { color: colors.text }]}>₹{totalPrice.toFixed(2)}</Text>
          </View>
          
          <View style={styles.priceRow}>
            <Text style={[styles.priceLabel, { color: colors.text }]}>Delivery Fee</Text>
            <Text style={[styles.priceValue, { color: colors.text }]}>
              {deliveryFee > 0 ? `₹${deliveryFee.toFixed(2)}` : 'FREE'}
            </Text>
          </View>
          
          {deliveryFee > 0 && (
            <Text style={[styles.freeDeliveryNote, { color: colors.primary }]}>
              Add items worth ₹{(500 - totalPrice).toFixed(2)} more for free delivery
            </Text>
          )}
          
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          
          <View style={styles.priceRow}>
            <Text style={[styles.totalLabel, { color: colors.text }]}>Total</Text>
            <Text style={[styles.totalValue, { color: colors.text }]}>₹{totalAmount.toFixed(2)}</Text>
          </View>
        </View>
        
        <TouchableOpacity
          style={[styles.checkoutButton, { backgroundColor: colors.primary }]}
          onPress={handlePlaceOrder}
          disabled={isPlacingOrder}
        >
          <Text style={[styles.checkoutButtonText, { color: colors.secondary }]}>
            {isPlacingOrder ? 'Placing Order...' : `Place Order (${totalItems} items)`}
          </Text>
        </TouchableOpacity>
      </View>
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
  cartList: {
    flexGrow: 1,
  },
  footer: {
    borderTopWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  priceDetails: {
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 14,
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  shopButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  shopButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  freeDeliveryNote: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
  },
});