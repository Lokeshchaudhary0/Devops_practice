import React, { createContext, useContext, useState } from 'react';
import { Address, addresses as mockAddresses } from '@/constants/MockData';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, phone: string, password: string) => Promise<void>;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (address: Address) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  getDefaultAddress: () => Address | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    addresses: mockAddresses,
  });

  const login = async (email: string, password: string) => {
    // Mock login - in a real app, this would call an API
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUser({
          id: '1',
          name: 'John Doe',
          email,
          phone: '+1234567890',
          addresses: mockAddresses,
        });
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
  };

  const signup = async (name: string, email: string, phone: string, password: string) => {
    // Mock signup - in a real app, this would call an API
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUser({
          id: '1',
          name,
          email,
          phone,
          addresses: [],
        });
        resolve();
      }, 1000);
    });
  };

  const addAddress = (address: Omit<Address, 'id'>) => {
    if (!user) return;

    const newAddress: Address = {
      ...address,
      id: Date.now().toString(),
    };

    // If this is the first address or if it's marked as default, ensure it's the only default
    if (address.isDefault || user.addresses.length === 0) {
      const updatedAddresses = user.addresses.map(addr => ({
        ...addr,
        isDefault: false,
      }));
      
      setUser({
        ...user,
        addresses: [...updatedAddresses, newAddress],
      });
    } else {
      setUser({
        ...user,
        addresses: [...user.addresses, newAddress],
      });
    }
  };

  const updateAddress = (address: Address) => {
    if (!user) return;

    // If updated address is default, unset others as default
    let updatedAddresses = [...user.addresses];
    
    if (address.isDefault) {
      updatedAddresses = updatedAddresses.map(addr => ({
        ...addr,
        isDefault: addr.id === address.id,
      }));
    } else {
      updatedAddresses = updatedAddresses.map(addr => 
        addr.id === address.id ? address : addr
      );
    }

    setUser({
      ...user,
      addresses: updatedAddresses,
    });
  };

  const deleteAddress = (id: string) => {
    if (!user) return;

    const deletedAddress = user.addresses.find(addr => addr.id === id);
    const remainingAddresses = user.addresses.filter(addr => addr.id !== id);

    // If we deleted the default address and have other addresses, set the first one as default
    if (deletedAddress?.isDefault && remainingAddresses.length > 0) {
      remainingAddresses[0].isDefault = true;
    }

    setUser({
      ...user,
      addresses: remainingAddresses,
    });
  };

  const setDefaultAddress = (id: string) => {
    if (!user) return;

    const updatedAddresses = user.addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id,
    }));

    setUser({
      ...user,
      addresses: updatedAddresses,
    });
  };

  const getDefaultAddress = () => {
    if (!user) return undefined;
    return user.addresses.find(addr => addr.isDefault);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      signup,
      addAddress,
      updateAddress,
      deleteAddress,
      setDefaultAddress,
      getDefaultAddress,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}