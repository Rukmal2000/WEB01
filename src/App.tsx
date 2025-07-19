import React, { useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { VehiclesPage } from './components/VehiclesPage';
import { MaterialsPage } from './components/MaterialsPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { SignUpPage } from './components/SignUpPage';
import { ConfirmationPage } from './components/ConfirmationPage';
import { UserDashboard } from './components/UserDashboard';
import { VehicleDetails } from './components/VehicleDetails';
import { ProfilePage } from './components/ProfilePage';
import { Footer } from './components/Footer';
import { User, Vehicle } from './types';
import { vehicles } from './data/services';

type ViewType = 'home' | 'vehicles' | 'materials' | 'about' | 'contact' | 'signup' | 'confirmation' | 'dashboard' | 'vehicle-details' | 'profile';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [registrationData, setRegistrationData] = useState<any>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('home');
    setIsMenuOpen(false);
  };

  const handleNavigation = (view: ViewType) => {
    setCurrentView(view);
    setIsMenuOpen(false);
  };

  const handleRegistration = (data: any) => {
    setRegistrationData(data);
    setCurrentView('confirmation');
  };

  const handleConfirmationAction = (action: 'home' | 'dashboard') => {
    if (action === 'home') {
      setCurrentView('home');
    } else {
      // Create user from registration data
      const newUser: User = {
        id: Date.now().toString(),
        name: registrationData.name,
        email: registrationData.email,
        phone: registrationData.phone,
        role: registrationData.role,
        isAuthenticated: true
      };
      setUser(newUser);
      setCurrentView('dashboard');
    }
    setRegistrationData(null);
  };

  const handleVehicleSelect = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setCurrentView('vehicle-details');
  };

  const handleUpdateProfile = (updatedData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updatedData });
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'vehicles':
        return <VehiclesPage />;
      case 'materials':
        return <MaterialsPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'signup':
        return <SignUpPage onRegistration={handleRegistration} />;
      case 'confirmation':
        return <ConfirmationPage onAction={handleConfirmationAction} registrationData={registrationData} />;
      case 'dashboard':
        return user ? <UserDashboard user={user} onVehicleSelect={handleVehicleSelect} /> : <HomePage />;
      case 'vehicle-details':
        return selectedVehicle ? (
          <VehicleDetails 
            vehicle={selectedVehicle} 
            onBack={() => setCurrentView('dashboard')} 
          />
        ) : <HomePage />;
      case 'profile':
        return user ? (
          <ProfilePage 
            user={user} 
            onUpdateProfile={handleUpdateProfile}
            onBack={() => setCurrentView('dashboard')}
          />
        ) : <HomePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
        currentView={currentView}
        onNavigate={handleNavigation}
      />

      {renderCurrentView()}

      <Footer onNavigate={handleNavigation} />
    </div>
  );
}

export default App;