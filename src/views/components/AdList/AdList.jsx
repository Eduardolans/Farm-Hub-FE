import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Time } from '../../../components/core/Time/Time';
import logic from '../../../logic';
import useContext from '../../../useContext';
import './AdList.css';

function AdList({ searchText, userLocation, distance }) {
    const { alert } = useContext();
    const navigate = useNavigate();
    const [ads, setAds] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);

        const fetchAds = async () => {
            try {
                let fetchedAds;
                if (searchText && userLocation) {
                    console.log(`Searching with distance: ${distance} km`);
                    fetchedAds = await logic.searchAds(
                        searchText,
                        userLocation,
                        distance
                    );
                } else {
                    fetchedAds = await logic.getAllAds();
                }
                if (isMounted) {
                    console.log(`Fetched ads: ${fetchedAds.length}`);
                    setAds(fetchedAds);
                    setIsLoading(false);
                }
            } catch (error) {
                if (isMounted) {
                    alert('Error loading ads:', error.message);
                    setAds([]);
                    setIsLoading(false);
                }
            }
        };

        fetchAds();

        return () => {
            isMounted = false;
        };
    }, [searchText, userLocation, distance, alert]);

    if (isLoading) {
        return (
            <p className="flex flex-cols relative mt-24 text-xl font-semibold justify-center items-center">
                Loading...
            </p>
        );
    }

    if (!ads || ads.length === 0) {
        return (
            <p className="AdListEmpty">
                No ads found within your search parameters or proximity
            </p>
        );
    }

    return (
        <div className="AdListContainer">
            <ul className="AdList">
                {ads.map((ad) => (
                    <li
                        key={ad._id}
                        className="AdListItem"
                        onClick={() =>
                            navigate(`/adpage/${ad._id}`, {
                                state: {
                                    prevSearch: searchText,
                                    prevLocation: userLocation,
                                },
                            })
                        }
                    >
                        <div className="AdListItemContent">
                            <div className="AdListItemHeader">
                                <p className="AdListItemAuthor">
                                    {ad.author.username}
                                </p>
                                <p className="AdListItemDate">
                                    {Time(ad.date)}
                                </p>
                            </div>
                            <p className="AdListItemTitle">{ad.title}</p>
                            <p className="AdListItemDescription">
                                {ad.description}
                            </p>
                            <p className="AdListItemPrice">{ad.price}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdList;
