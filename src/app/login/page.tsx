import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const fetchQrCode = async () => {
      try {
        const response = await fetch('/api/qrcode'); 
        if (response.ok) {
          const data = await response.json();
          setQrCodeData(data.qrCode);
        } else {
          console.error('Failed to fetch QR code');
        }
      } catch (error) {
        console.error('Error fetching QR code:', error);
      }
    };

    const checkLoginStatus = async () => {
      try {
        const response = await fetch('/api/login-status');
        if (response.ok) {
          const data = await response.json();
          if (data.isLoggedIn) {
            setIsLoggedIn(true);
            onLoginSuccess();
          }
        } else {
            console.error('Failed to fetch login status');
        }
      } catch (error) {
          console.error('Error fetching login status:', error);
      }
    }

    fetchQrCode();
    const intervalId = setInterval(() => {
      fetchQrCode();
      if (!isLoggedIn) {
        checkLoginStatus();
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [onLoginSuccess, isLoggedIn]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {qrCodeData ? (
        <div>
          <h2>Login with QR Code</h2>
          <QRCodeSVG value={qrCodeData} size={256} level="H" />
          <p>Scan with your mobile device to log in.</p>
        </div>
      ) : (
        <div>Loading QR Code...</div>
      )}
    </div>
  );
};

export default LoginPage;