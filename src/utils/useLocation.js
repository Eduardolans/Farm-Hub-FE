import { useContext } from 'react';
import { LocationContext } from '../LocationContext';

export const useLocation = () => {
    const locationContext = useContext(LocationContext);
    if (!locationContext) {
        throw new Error('useLocation must be used within a LocationProvider');
    }

    return locationContext;
};
