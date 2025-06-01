import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  SafeAreaView,
  Alert
} from 'react-native';
import { LogOut, CreditCard as Edit2, MapPin, Phone, Mail, User as UserIcon, ChevronRight } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';

export default function ProfileScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { user, isAuthenticated, login, logout } = useAuth();
  
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleAuth = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (isLoginForm) {
        await login(email, password);
      } else {
        if (!name.trim() || !phone.trim()) {
          Alert.alert('Error', 'Please fill all the fields');
          setIsLoading(false);
          return;
        }
        // Handle signup logic here
        Alert.alert('Success', 'Account created successfully');
        setIsLoginForm(true);
      }
    } catch (error) {
      Alert.alert('Error', 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: () => logout(), style: 'destructive' }
      ]
    );
  };
  
  const renderAuthScreen = () => (
    <View style={styles.authContainer}>
      <View style={styles.authHeader}>
        <Text style={[styles.authTitle, { color: colors.text }]}>
          {isLoginForm ? 'Login to your account' : 'Create a new account'}
        </Text>
        <Text style={[styles.authSubtitle, { color: colors.tabIconDefault }]}>
          {isLoginForm ? 'Enter your credentials to continue' : 'Fill in the details to sign up'}
        </Text>
      </View>
      
      <View style={styles.formContainer}>
        {!isLoginForm && (
          <View style={[styles.inputContainer, { borderColor: colors.border }]}>
            <UserIcon size={20} color={colors.tabIconDefault} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="Full Name"
              placeholderTextColor={colors.placeholder}
              value={name}
              onChangeText={setName}
            />
          </View>
        )}
        
        <View style={[styles.inputContainer, { borderColor: colors.border }]}>
          <Mail size={20} color={colors.tabIconDefault} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Email"
            placeholderTextColor={colors.placeholder}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        
        {!isLoginForm && (
          <View style={[styles.inputContainer, { borderColor: colors.border }]}>
            <Phone size={20} color={colors.tabIconDefault} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="Phone Number"
              placeholderTextColor={colors.placeholder}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>
        )}
        
        <View style={[styles.inputContainer, { borderColor: colors.border }]}>
          <UserIcon size={20} color={colors.tabIconDefault} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Password"
            placeholderTextColor={colors.placeholder}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        
        <TouchableOpacity
          style={[styles.authButton, { backgroundColor: colors.primary }]}
          onPress={handleAuth}
          disabled={isLoading}
        >
          <Text style={[styles.authButtonText, { color: colors.secondary }]}>
            {isLoading ? 'Please wait...' : isLoginForm ? 'Login' : 'Sign Up'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.switchAuthMode}
          onPress={() => setIsLoginForm(!isLoginForm)}
        >
          <Text style={[styles.switchAuthText, { color: colors.primary }]}>
            {isLoginForm ? 'New user? Create an account' : 'Already have an account? Login'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
  const renderProfileScreen = () => (
    <ScrollView style={styles.profileScrollView}>
      <View style={[styles.profileHeader, { backgroundColor: colors.primary }]}>
        <View style={styles.profileInfo}>
          <View style={[styles.profileImage, { backgroundColor: colors.cardBackground }]}>
            <UserIcon size={40} color={colors.primary} />
          </View>
          <View style={styles.profileDetails}>
            <Text style={[styles.profileName, { color: colors.secondary }]}>{user?.name}</Text>
            <Text style={[styles.profileEmail, { color: colors.secondary }]}>{user?.email}</Text>
            <Text style={[styles.profilePhone, { color: colors.secondary }]}>{user?.phone}</Text>
          </View>
        </View>
        
        <TouchableOpacity
          style={[styles.editProfileButton, { backgroundColor: `${colors.secondary}20` }]}
          onPress={() => console.log('Edit profile')}
        >
          <Edit2 size={16} color={colors.secondary} style={styles.editIcon} />
          <Text style={[styles.editProfileText, { color: colors.secondary }]}>Edit</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.profileSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Addresses</Text>
        
        {user?.addresses && user.addresses.length > 0 ? (
          user.addresses.map((address) => (
            <View 
              key={address.id} 
              style={[styles.addressCard, { 
                backgroundColor: colors.cardBackground, 
                borderColor: address.isDefault ? colors.primary : colors.border 
              }]}
            >
              <View style={styles.addressHeader}>
                <View style={[styles.addressBadge, { backgroundColor: colors.primary }]}>
                  <Text style={[styles.addressBadgeText, { color: colors.secondary }]}>
                    {address.type}
                  </Text>
                </View>
                {address.isDefault && (
                  <View style={[styles.defaultBadge, { backgroundColor: `${colors.primary}20` }]}>
                    <Text style={[styles.defaultText, { color: colors.primary }]}>Default</Text>
                  </View>
                )}
              </View>
              
              <View style={styles.addressContent}>
                <MapPin size={16} color={colors.tabIconDefault} style={styles.addressIcon} />
                <Text style={[styles.addressText, { color: colors.text }]}>{address.address}</Text>
              </View>
              
              {address.landmark && (
                <Text style={[styles.landmarkText, { color: colors.tabIconDefault }]}>
                  Landmark: {address.landmark}
                </Text>
              )}
              
              <View style={styles.addressActions}>
                <TouchableOpacity
                  style={[styles.addressButton, { borderColor: colors.border }]}
                  onPress={() => console.log('Edit address')}
                >
                  <Text style={[styles.addressButtonText, { color: colors.primary }]}>Edit</Text>
                </TouchableOpacity>
                
                {!address.isDefault && (
                  <TouchableOpacity
                    style={[styles.addressButton, { borderColor: colors.border }]}
                    onPress={() => console.log('Set as default')}
                  >
                    <Text style={[styles.addressButtonText, { color: colors.primary }]}>
                      Set as Default
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))
        ) : (
          <View style={[styles.emptyAddressContainer, { borderColor: colors.border }]}>
            <MapPin size={24} color={colors.tabIconDefault} />
            <Text style={[styles.emptyAddressText, { color: colors.text }]}>
              No addresses saved
            </Text>
            <TouchableOpacity 
              style={[styles.addAddressButton, { backgroundColor: colors.primary }]}
              onPress={() => console.log('Add address')}
            >
              <Text style={[styles.addAddressText, { color: colors.secondary }]}>
                Add New Address
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      <View style={styles.profileSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Settings</Text>
        
        <TouchableOpacity style={[styles.menuItem, { borderColor: colors.border }]}>
          <Text style={[styles.menuItemText, { color: colors.text }]}>Notifications</Text>
          <ChevronRight size={16} color={colors.tabIconDefault} />
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.menuItem, { borderColor: colors.border }]}>
          <Text style={[styles.menuItemText, { color: colors.text }]}>Payment Methods</Text>
          <ChevronRight size={16} color={colors.tabIconDefault} />
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.menuItem, { borderColor: colors.border }]}>
          <Text style={[styles.menuItemText, { color: colors.text }]}>Help Center</Text>
          <ChevronRight size={16} color={colors.tabIconDefault} />
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.menuItem, { borderColor: colors.border }]}>
          <Text style={[styles.menuItemText, { color: colors.text }]}>About Us</Text>
          <ChevronRight size={16} color={colors.tabIconDefault} />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={[styles.logoutButton, { backgroundColor: `${colors.error}10`, borderColor: colors.error }]}
        onPress={handleLogout}
      >
        <LogOut size={16} color={colors.error} style={styles.logoutIcon} />
        <Text style={[styles.logoutText, { color: colors.error }]}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {isAuthenticated ? renderProfileScreen() : renderAuthScreen()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Auth Screen Styles
  authContainer: {
    flex: 1,
    padding: 16,
  },
  authHeader: {
    marginVertical: 40,
    alignItems: 'center',
  },
  authTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  authSubtitle: {
    fontSize: 16,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    height: 50,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  authButton: {
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  authButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchAuthMode: {
    alignItems: 'center',
    marginTop: 24,
  },
  switchAuthText: {
    fontSize: 16,
  },
  // Profile Screen Styles
  profileScrollView: {
    flex: 1,
  },
  profileHeader: {
    padding: 24,
    paddingBottom: 36,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 24,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    marginBottom: 4,
  },
  profilePhone: {
    fontSize: 14,
  },
  editProfileButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  editIcon: {
    marginRight: 4,
  },
  editProfileText: {
    fontSize: 12,
    fontWeight: '500',
  },
  profileSection: {
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  addressCard: {
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
    overflow: 'hidden',
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingBottom: 8,
  },
  addressBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  addressBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  defaultBadge: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  defaultText: {
    fontSize: 12,
    fontWeight: '500',
  },
  addressContent: {
    flexDirection: 'row',
    padding: 12,
    paddingTop: 8,
  },
  addressIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  addressText: {
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  landmarkText: {
    fontSize: 12,
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  addressActions: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderColor: '#E1E1E1',
  },
  addressButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRightWidth: 0.5,
  },
  addressButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  emptyAddressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 8,
  },
  emptyAddressText: {
    fontSize: 16,
    marginVertical: 16,
  },
  addAddressButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  addAddressText: {
    fontSize: 14,
    fontWeight: '600',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 0.5,
  },
  menuItemText: {
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 32,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
  },
});