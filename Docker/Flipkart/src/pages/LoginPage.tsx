import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      console.log('Login with:', { email, password });
      alert('Login successful!');
    } else {
      console.log('Sign up with:', { name, email, phone, password });
      alert('Account created successfully!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full grid grid-cols-1 md:grid-cols-5 shadow-lg rounded-lg overflow-hidden">
        {/* Left Section - Image and Information */}
        <div className="bg-primary p-8 flex flex-col justify-between md:col-span-2">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {isLogin ? 'Login' : 'Looks like you\'re new here!'}
            </h2>
            <p className="text-primary-light mb-6">
              {isLogin 
                ? 'Get access to your Orders, Wishlist and Recommendations' 
                : 'Sign up with your details to get started'}
            </p>
          </div>
          <img 
            src="https://images.pexels.com/photos/5632386/pexels-photo-5632386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Shopping" 
            className="hidden md:block mt-auto"
          />
        </div>
        
        {/* Right Section - Form */}
        <div className="bg-white p-8 md:col-span-3">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="name\" className="block text-sm font-medium text-neutral-700 mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required={!isLogin}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
            
            {!isLogin && (
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                  Mobile Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required={!isLogin}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
            )}
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              {isLogin && (
                <div className="text-right mt-1">
                  <Link to="/forgot-password" className="text-sm text-primary hover:text-primary-dark">
                    Forgot password?
                  </Link>
                </div>
              )}
              
              {!isLogin && (
                <p className="mt-2 text-xs text-neutral-500">
                  By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.
                </p>
              )}
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {isLogin ? 'Login' : 'Sign Up'}
              </button>
            </div>
            
            {isLogin && (
              <div className="text-center mt-4">
                <p className="text-sm text-neutral-600">
                  OR
                </p>
                <button
                  type="button"
                  className="mt-2 w-full flex justify-center py-2 px-4 border border-neutral-300 rounded-md shadow-sm text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Request OTP
                </button>
              </div>
            )}
          </form>
          
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={toggleForm}
              className="text-primary hover:text-primary-dark font-medium"
            >
              {isLogin ? 'New to Flipkart? Create an account' : 'Existing User? Log in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;