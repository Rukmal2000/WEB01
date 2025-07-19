import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MaterialsSection } from './components/MaterialsSection';
import { VehiclesSection } from './components/VehiclesSection';
import { ServicesPage } from './components/ServicesPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { GuestMaterialPage } from './components/GuestMaterialPage';
import { GuestVehiclePage } from './components/GuestVehiclePage';
import { GuestPartnerPage } from './components/GuestPartnerPage';
import { AuthModal } from './components/AuthModal';
import { ServiceRequestModal } from './components/ServiceRequestModal';
import { PartnerRegistration } from './components/PartnerRegistration';
import { PartnerDashboard } from './components/PartnerDashboard';
import { Footer } from './components/Footer';
import { User, MaterialItem, Vehicle, ServiceRequest, Partner } from './types';
import { materialItems, vehicles } from './data/services';
import { CheckCircle, Users, Truck } from 'lucide-react';

type ViewType = 'home' | 'services' | 'materials' | 'vehicles' | 'about' | 'contact' | 'partner-dashboard';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [user, setUser] = useState<User | null>(null);
  const [partner, setPartner] = useState<Partner | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPartnerRegistrationOpen, setIsPartnerRegistrationOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [serviceRequestModal, setServiceRequestModal] = useState<{
    isOpen: boolean;
    item: MaterialItem | Vehicle | null;
    quantity?: number;
    duration?: number;
    durationType?: 'hours' | 'days';
  }>({
    isOpen: false,
    item: null
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setPartner(null);
    setCurrentView('home');
  };

  const handleUpdateProfile = (updatedData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updatedData });
    }
  };
  const handleNavigation = (view: ViewType) => {
    setCurrentView(view);
    setIsMenuOpen(false);
  };

  const handleServiceSelect = (service: 'materials' | 'vehicles') => {
    setCurrentView(service);
  };

  const handleMaterialRequest = (item: MaterialItem, quantity: number) => {
    setServiceRequestModal({
      isOpen: true,
      item,
      quantity
    });
  };

  const handleVehicleRequest = (vehicle: Vehicle, duration: number, durationType: 'hours' | 'days') => {
    setServiceRequestModal({
      isOpen: true,
      item: vehicle,
      duration,
      durationType
    });
  };

  const handleServiceRequestSubmit = (request: Omit<ServiceRequest, 'id' | 'userId' | 'status' | 'requestDate'>) => {
    // This would create a notification for the supplier/owner
    console.log('Contact request sent to supplier/owner:', request);
    
    setServiceRequestModal({
      isOpen: false,
      item: null
    });
    
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handlePartnerRegistration = (partnerData: Omit<Partner, 'id' | 'status' | 'registrationDate' | 'rating' | 'totalJobs'>) => {
    // Simulate partner registration
    const newPartner: Partner = {
      ...partnerData,
      id: Date.now().toString(),
      status: 'pending',
      registrationDate: new Date().toISOString(),
      rating: 0,
      totalJobs: 0
    };
    
    setPartner(newPartner);
    setIsPartnerRegistrationOpen(false);
    setCurrentView('partner-dashboard');
    
    // Show success message
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 5000);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'services':
        return <ServicesPage onServiceSelect={handleServiceSelect} />;
      case 'materials':
        return (
          <MaterialsSection
            onBack={() => setCurrentView('home')}
            onRequestService={handleMaterialRequest}
          />
        );
      case 'vehicles':
        return (
          <VehiclesSection
            onBack={() => setCurrentView('home')}
            onRequestService={handleVehicleRequest}
          />
        );
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'materials':
        return user ? (
          <MaterialsSection
            onBack={() => setCurrentView('home')}
            onRequestService={handleMaterialRequest}
          />
        ) : (
          <GuestMaterialPage onSignUp={() => setIsAuthModalOpen(true)} />
        );
      case 'vehicles':
        return user ? (
          <VehiclesSection
            onBack={() => setCurrentView('home')}
            onRequestService={handleVehicleRequest}
          />
        ) : (
          <GuestVehiclePage onSignUp={() => setIsAuthModalOpen(true)} />
        );
      case 'partner-dashboard':
        return partner ? (
          <PartnerDashboard partner={partner} />
        ) : (
          <GuestPartnerPage onSignUp={() => setIsPartnerRegistrationOpen(true)} />
        );
      default:
        return <Hero onServiceSelect={handleServiceSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        user={user}
        onAuthClick={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onUpdateProfile={handleUpdateProfile}
        onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
        currentView={currentView}
        onNavigate={handleNavigation}
      />

      {renderCurrentView()}

      {/* Partner Registration CTA */}

      <Footer onNavigate={handleNavigation} />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />

      <PartnerRegistration
        isOpen={isPartnerRegistrationOpen}
        onClose={() => setIsPartnerRegistrationOpen(false)}
        onSubmit={handlePartnerRegistration}
      />

      <ServiceRequestModal
        isOpen={serviceRequestModal.isOpen}
        onClose={() => setServiceRequestModal({ isOpen: false, item: null })}
        item={serviceRequestModal.item}
        quantity={serviceRequestModal.quantity}
        duration={serviceRequestModal.duration}
        durationType={serviceRequestModal.durationType}
        onSubmit={handleServiceRequestSubmit}
      />

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center z-50">
          <CheckCircle size={20} className="mr-2" />
          <span>
            {partner && currentView === 'partner-dashboard' 
              ? 'Partner registration submitted successfully! We\'ll review your application within 2-3 business days.'
              : 'Service request submitted successfully! We\'ll contact you soon.'
            }
          </span>
        </div>
      )}
    </div>
  );
}

export default App;