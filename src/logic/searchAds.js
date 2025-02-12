import errors, { SystemError } from './../../com/errors';

const searchAds = (searchText = null, userLocation, distance) => {
    let url = `${
        import.meta.env.VITE_API_URL
    }/searchads?maxDistance=${distance}`;

    if (searchText) {
        url += `&searchText=${encodeURIComponent(searchText)}`;
    }

    if (userLocation && userLocation.latitude && userLocation.longitude) {
        url += `&lat=${userLocation.latitude}&lng=${userLocation.longitude}`;
    }

    return fetch(url, {
        method: 'GET',

        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
        },
    })
        .catch(() => {
            throw new SystemError('server connection problem');
        })
        .then((response) => {
            if (response.status === 200) {
                return response
                    .json()
                    .catch(() => {
                        throw new SystemError('server connection problem');
                    })
                    .then((ads) => ads);
            }

            return response
                .json()
                .catch(() => {
                    throw new SystemError('server connection problem');
                })
                .then((body) => {
                    const { error, message } = body;

                    const constructor = errors[error];

                    throw new constructor(message);
                });
        });
};

export default searchAds;
