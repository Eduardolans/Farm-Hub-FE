import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import AdList from './components/AdList/AdList';
import SearchBox from './components/SearchBox/SearchBox';
import { CreateAdButton } from './components/CreateAdButton/CreateAdButton';
import Header from './components/Header/Header';
import useContext from '../useContext';
import { ContextForLocation } from '../LocationContext';
import { ContextForUser } from '../UserContext';
import DistanceRangeSlider from './components/DistanceSlider/DistanceRangeSlider';

import './Home.css';

function Home() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentSearchText, setCurrentSearchText] = useState(
        searchParams.get('q') || ''
    );
    const [distance, setDistance] = useState(() => {
        return parseInt(searchParams.get('distance') || '50', 10);
    });

    const { alert } = useContext();
    const { userLocation, fetchUserLocation } = ContextForLocation();
    const { currentUser, fetchCurrentUser, isLoading } = ContextForUser();

    const updateUrlParams = useCallback(
        (text, dist) => {
            const params = new URLSearchParams(searchParams);
            if (text) params.set('q', text);
            else params.delete('q');
            params.set('distance', dist.toString());
            setSearchParams(params);
        },
        [searchParams, setSearchParams]
    );

    const handleSearch = useCallback(
        (text) => {
            setCurrentSearchText(text);
            fetchUserLocation();
            updateUrlParams(text, distance);
        },
        [distance, fetchUserLocation, updateUrlParams]
    );

    const handleDistanceChange = useCallback(
        (newDistance) => {
            setDistance(newDistance);
            updateUrlParams(currentSearchText, newDistance);
        },
        [currentSearchText, updateUrlParams]
    );

    useEffect(() => {
        const q = searchParams.get('q');
        const d = searchParams.get('distance');
        if (q !== null) setCurrentSearchText(q);
        if (d !== null) setDistance(parseInt(d, 10));
    }, [searchParams]);

    useEffect(() => {
        if (!currentUser && !isLoading) {
            fetchCurrentUser().catch((error) => {
                alert('Failed to fetch user information: ' + error.message);
            });
        }
    }, [currentUser, fetchCurrentUser, isLoading, alert]);

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
                        setDistance={handleDistanceChange}
                        updateUrlParams={updateUrlParams}
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
