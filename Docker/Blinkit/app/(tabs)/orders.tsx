import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { orders } from '@/constants/MockData';
import { Package, ChevronRight, Clock } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';

export default function OrdersScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return colors.success;
      case 'confirmed': return colors.primary;
      case 'pending': return colors.warning;
      case 'canceled': return colors.error;
      default: return colors.tabIconDefault;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };
  
  const renderOrderItem = ({ item }: { item: typeof orders[0] }) => {
    const statusColor = getStatusColor(item.status);
    const statusText = item.status.charAt(0).toUpperCase() + item.status.slice(1);
    
    return (
      <TouchableOpacity 
        style={[styles.orderCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}
        onPress={() => console.log(`View order ${item.id}`)}
        activeOpacity={0.7}
      >
        <View style={styles.orderHeader}>
          <View>
            <Text style={[styles.orderId, { color: colors.text }]}>{item.id}</Text>
            <Text style={[styles.orderDate, { color: colors.tabIconDefault }]}>
              {formatDate(item.date)}
            </Text>
          </View>
          <View style={[styles.statusContainer, { backgroundColor: `${statusColor}20` }]}>
            <Text style={[styles.statusText, { color: statusColor }]}>{statusText}</Text>
          </View>
        </View>
        
        <View style={styles.orderItems}>
          {item.items.map((cartItem, index) => (
            <View key={index} style={styles.itemRow}>
              <Image source={{ uri: cartItem.image }} style={styles.itemImage} />
              <Text 
                style={[styles.itemName, { color: colors.text }]} 
                numberOfLines={1}
              >
                {cartItem.name}
              </Text>
              <Text style={[styles.itemQuantity, { color: colors.tabIconDefault }]}>
                x{cartItem.quantity}
              </Text>
            </View>
          ))}
        </View>
        
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        
        <View style={styles.orderFooter}>
          <View style={styles.totalContainer}>
            <Text style={[styles.totalLabel, { color: colors.tabIconDefault }]}>Total Amount</Text>
            <Text style={[styles.totalValue, { color: colors.text }]}>₹{item.total}</Text>
          </View>
          
          {item.status === 'confirmed' && (
            <View style={styles.deliveryTimeContainer}>
              <Clock size={14} color={colors.primary} style={styles.clockIcon} />
              <Text style={[styles.deliveryTime, { color: colors.primary }]}>
                Arriving in {item.estimatedDeliveryTime}
              </Text>
            </View>
          )}
          
          <TouchableOpacity style={styles.viewDetailsButton}>
            <Text style={[styles.viewDetailsText, { color: colors.primary }]}>View Details</Text>
            <ChevronRight size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };
  
  if (orders.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.heading, { color: colors.text }]}>Your Orders</Text>
        <View style={styles.emptyContainer}>
          <Package size={60} color={colors.primary} />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>No orders yet</Text>
          <Text style={[styles.emptySubtitle, { color: colors.tabIconDefault }]}>
            Your order history will appear here
          </Text>
          <TouchableOpacity
            style={[styles.shopButton, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/')}
          >
            <Text style={[styles.shopButtonText, { color: colors.secondary }]}>
              Start Shopping
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.heading, { color: colors.text }]}>Your Orders</Text>
      
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.ordersList}
        showsVerticalScrollIndicator={false}
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
  ordersList: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  orderCard: {
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
  },
  orderDate: {
    fontSize: 14,
    marginTop: 4,
  },
  statusContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  orderItems: {
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemImage: {
    width: 36,
    height: 36,
    borderRadius: 4,
    marginRight: 8,
  },
  itemName: {
    fontSize: 14,
    flex: 1,
  },
  itemQuantity: {
    fontSize: 14,
    marginLeft: 8,
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalContainer: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewDetailsText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
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
  deliveryTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  clockIcon: {
    marginRight: 4,
  },
  deliveryTime: {
    fontSize: 14,
    fontWeight: '500',
  },
});