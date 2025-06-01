import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { CircleMinus as MinusCircle, CirclePlus as PlusCircle, Trash2 } from 'lucide-react-native';
import { CartItem as CartItemType } from '@/constants/MockData';
import { useCart } from '@/context/CartContext';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { addToCart, removeFromCart, deleteFromCart } = useCart();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View style={[styles.container, { borderBottomColor: colors.border }]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      
      <View style={styles.infoContainer}>
        <Text style={[styles.name, { color: colors.text }]} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={[styles.unit, { color: colors.tabIconDefault }]}>
          {item.unit}
        </Text>
        <View style={styles.priceRow}>
          <Text style={[styles.price, { color: colors.text }]}>
            ₹{item.price}
          </Text>
          {item.originalPrice && (
            <Text style={styles.originalPrice}>₹{item.originalPrice}</Text>
          )}
          {item.discount && (
            <Text style={[styles.discount, { color: colors.success }]}>
              {item.discount}% off
            </Text>
          )}
        </View>
      </View>
      
      <View style={styles.actionsContainer}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            onPress={() => removeFromCart(item.id)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            {item.quantity === 1 ? (
              <Trash2 size={22} color={colors.error} />
            ) : (
              <MinusCircle size={24} color={colors.primary} />
            )}
          </TouchableOpacity>
          
          <Text style={[styles.quantity, { color: colors.text }]}>
            {item.quantity}
          </Text>
          
          <TouchableOpacity 
            onPress={() => addToCart(item)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <PlusCircle size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        
        <Text style={[styles.totalPrice, { color: colors.text }]}>
          ₹{(item.price * item.quantity).toFixed(2)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  unit: {
    fontSize: 14,
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
  },
  originalPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    color: '#86939E',
    marginLeft: 4,
  },
  discount: {
    fontSize: 14,
    marginLeft: 8,
  },
  actionsContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 90,
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 8,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  }
});