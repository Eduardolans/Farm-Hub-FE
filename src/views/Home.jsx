import { useEffect, useState } from 'react';
import {
    useLocation as useRouterLocation,
    useNavigate,
} from 'react-router-dom';
import logic from '../logic';
import AdList from './components/AdList/AdList';
import SearchBox from './components/SearchBox/SearchBox';
import { CreateAdButton } from './components/CreateAdButton/CreateAdButton';
import Header from './components/Header/Header';
import useContext from '../useContext';
import { ContextForLocation } from '../LocationContext';
import DistanceRangeSlider from './Settings';

import './Home.css';

function Home() {
    const [user, setUser] = useState('');
    const [currentSearchText, setCurrentSearchText] = useState('');
    const [distance, setDistance] = useState(50);

    const { alert } = useContext();
    const navigate = useNavigate();
    const { userLocation, fetchUserLocation } = ContextForLocation();

    const routerLocation = useRouterLocation();

    const searchParams = new URLSearchParams(routerLocation.search);
    const q = searchParams.get('q');

    useEffect(() => {
        setCurrentSearchText(q || '');
    }, [q]);

    useEffect(() => {
        fetchUsername();
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
                    <DistanceRangeSlider
                        distance={distance}
                        setDistance={setDistance}
                    />
                    {userLocation && (
                        <AdList
                            searchText={currentSearchText}
                            userLocation={userLocation}
                            distance={distance}
                        />
                    )}
                </main>
                <CreateAdButton />
            </div>
        </>
    );
}

export default Home;
