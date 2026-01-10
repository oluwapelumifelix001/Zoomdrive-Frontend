import React, { useState, useEffect, createContext, useContext } from 'react';

const PWAContext = createContext();

export const PWAProvider = ({ children }) => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleBeforeInstall = (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e);
            setIsVisible(true);
            console.log("✅ PWA Install prompt captured globally");
        };

        const handleAppInstalled = () => {
            setIsVisible(false);
            setDeferredPrompt(null);
            console.log("🚀 PWA installed successfully");
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstall);
        window.addEventListener('appinstalled', handleAppInstalled);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);

    const installApp = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            setDeferredPrompt(null);
            setIsVisible(false);
        }
    };

    return (
        <PWAContext.Provider value={{ isVisible, installApp }}>
            {children}
        </PWAContext.Provider>
    );
};

export const usePWA = () => useContext(PWAContext);
export default PWAProvider;