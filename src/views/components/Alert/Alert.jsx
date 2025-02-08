import './Alert.css';

const Alert = ({ message, onAccept, level = 'warn' }) => {
    return (
        <div className="Alert">
            <div className={`AlertBox AlertBox-${level}`}>
                <p>{message}</p>
                <button className="Button" onClick={onAccept}>
                    Accept
                </button>
            </div>
        </div>
    );
};

export default Alert;
