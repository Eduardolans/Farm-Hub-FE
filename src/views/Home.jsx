import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logic from '../logic';
import AdList from './components/AdList/AdList';
import SearchBox from './components/SearchBox/SearchBox';
import { CreateAdButton } from './components/CreateAdButton/CreateAdButton';
import Header from './components/Header/Header';
import useContext from '../useContext';
import { getUserLocation } from '../utils/getUserLocation';

import './Home.css';

function Home() {
    const [user, setUser] = useState('');
    const [currentSearchText, setCurrentSearchText] = useState('');
    const [userLocation, setUserLocation] = useState(null);

    const { alert } = useContext();
    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const q = searchParams.get('q');

    useEffect(() => {
        setCurrentSearchText(q || '');
    }, [q]);

    useEffect(() => {
        fetchUsername();
        fetchUserLocation();
    }, []);

    const fetchUsername = () => {
        try {
            logic
                .getUsername()
                .then((user) => {
                    setUser(user);
                })
                .catch((error) => {
                    alert(error.message);
                });
        } catch (error) {
            alert(error.message);
        }
    };

    const fetchUserLocation = () => {
        try {
            getUserLocation()
                .then((location) => {
                    setUserLocation(location);
                })
                .catch((error) => {
                    alert('Error getting user location:', error.message);
                });
        } catch (error) {
            alert(
                'Geolocation may not be enabled or is not supported by your browser:',
                error.message
            );
        }
    };

    const handleSearch = (text) => {
        setCurrentSearchText(text);
        fetchUserLocation();
        if (text) {
            navigate(`/?q=${text}`);
        } else {
            setCurrentSearchText('');
            navigate('/');
        }
    };

    return (
        <>
            <Header user={user} />
            <div className="HomeContainer">
                <main className="Home">
                    <SearchBox
                        onSearch={handleSearch}
                        initialSearchText={currentSearchText}
                    />
                    {userLocation && (
                        <AdList
                            searchText={currentSearchText}
                            userLocation={userLocation}
                        />
                    )}
                </main>
                <CreateAdButton />
            </div>
        </>
    );
}

export default Home;
