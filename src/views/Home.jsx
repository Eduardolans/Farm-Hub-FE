import { useEffect, useState } from 'react';
import {
    useLocation as useRouterLocation,
    useNavigate,
} from 'react-router-dom';
import AdList from './components/AdList/AdList';
import SearchBox from './components/SearchBox/SearchBox';
import { CreateAdButton } from './components/CreateAdButton/CreateAdButton';
import Header from './components/Header/Header';
import useContext from '../useContext';
import { ContextForLocation } from '../LocationContext';
import { ContextForUser } from '../UserContext';
import DistanceRangeSlider from './Settings';

import './Home.css';

function Home() {
    const [currentSearchText, setCurrentSearchText] = useState('');
    const [distance, setDistance] = useState(50);

    const { alert } = useContext();
    const navigate = useNavigate();
    const { userLocation, fetchUserLocation } = ContextForLocation();
    const { currentUser, fetchCurrentUser, isLoading } = ContextForUser();

    const routerLocation = useRouterLocation();

    const searchParams = new URLSearchParams(routerLocation.search);
    const q = searchParams.get('q');

    useEffect(() => {
        setCurrentSearchText(q || '');
    }, [q]);

    useEffect(() => {
        if (!currentUser && !isLoading) {
            fetchCurrentUser().catch((error) => {
                alert('Failed to fetch user information: ' + error.message);
            });
        }
    }, [currentUser, fetchCurrentUser, isLoading, alert]);

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

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <Header user={currentUser} />
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
