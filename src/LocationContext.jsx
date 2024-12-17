import { createContext, useEffect, useState, useContext } from 'react';

import { useLocation } from 'react-router-dom';

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [userLocation, setUserLocation] = useState(null);

    const fetchUserLocation = () => {
        if (!userLocation) {
            try {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const newUserLocation = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        };
                        setUserLocation(newUserLocation);
                    },
                    (error) => {
                        alert('Error getting user location:', error.message);
                    }
                );
            } catch (error) {
                alert(
                    'Geolocation may not be enabled or is not supported by your browser:',
                    error.message
                );
            }
        }
    };

    const currentRoute = useLocation();

    useEffect(() => {
        if (currentRoute.pathname === '/') {
            fetchUserLocation();
        }
    }, [currentRoute]);

    return (
        <LocationContext.Provider
            value={{ userLocation, setUserLocation, fetchUserLocation }}
        >
            {children}
        </LocationContext.Provider>
    );
};

export const ContextForLocation = () => {
    const locationContext = useContext(LocationContext);
    if (!locationContext) {
        throw new Error('useLocation must be used within a LocationProvider');
    }

    return locationContext;
};
