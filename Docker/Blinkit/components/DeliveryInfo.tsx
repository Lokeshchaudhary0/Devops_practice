import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { MapPin, Clock, ChevronDown } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';

interface DeliveryInfoProps {
  address: string;
  deliveryTime: string;
  onAddressPress?: () => void;
}

export default function DeliveryInfo({
  address,
  deliveryTime,
  onAddressPress,
}: DeliveryInfoProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.addressContainer} 
        onPress={onAddressPress}
        activeOpacity={0.7}
      >
        <MapPin size={16} color={colors.primary} style={styles.icon} />
        <Text style={[styles.address, { color: colors.text }]} numberOfLines={1}>
          {address}
        </Text>
        <ChevronDown size={16} color={colors.tabIconDefault} />
      </TouchableOpacity>

      <View style={styles.deliveryContainer}>
        <Clock size={16} color={colors.primary} style={styles.icon} />
        <Text style={[styles.deliveryTime, { color: colors.text }]}>
          Delivery in <Text style={[styles.time, { color: colors.primary }]}>{deliveryTime}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    marginRight: 8,
  },
  address: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryTime: {
    fontSize: 14,
  },
  time: {
    fontWeight: '600',
  },
});