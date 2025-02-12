const DistanceRangeSlider = ({ distance, setDistance, updateUrlParams }) => {
    const handleSliderChange = (event) => {
        if (event && event.target) {
            const newDistance = parseInt(event.target.value, 10);
            setDistance(newDistance);
            updateUrlParams(null, newDistance);
        }
    };

    return (
        <div className="distance-slider w-full p-1 bg-green-200 fixed flex-col  left-0 mt-[60px] z-20">
            <input
                type="range"
                min="1"
                max="120"
                value={distance}
                onChange={handleSliderChange}
                className="slider"
            />
            <div className="slider-value">
                Distancia de busqueda: {distance} km
            </div>
        </div>
    );
};

export default DistanceRangeSlider;
