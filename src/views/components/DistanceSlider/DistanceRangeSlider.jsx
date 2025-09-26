const DistanceRangeSlider = ({ distance, setDistance, updateUrlParams }) => {
    const handleSliderChange = (event) => {
        if (event && event.target) {
            const newDistance = parseInt(event.target.value, 10);
            setDistance(newDistance);
            updateUrlParams(null, newDistance);
        }
    };

    return (
        <div className="distance-slider">
            <input
                type="range"
                min="1"
                max="150"
                value={distance}
                onChange={handleSliderChange}
                className="slider"
            />
            <div className="slider-value">
                Distancia de búsqueda: {distance} km
            </div>
        </div>
    );
};

export default DistanceRangeSlider;
