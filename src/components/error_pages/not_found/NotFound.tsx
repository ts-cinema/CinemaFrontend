import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const onButtonClick = (e: any) => {
        e.preventDefault();
        navigate(from, { replace: true });
    };

    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>
                        4<span></span>4
                    </h1>
                </div>
                <h2>Oops! Page Not Found</h2>
                <p>
                    Sorry but the page you are looking for does not exist, has been removed or is temporarily
                    unavailable.
                </p>
                <Button color="warning" variant="contained" onClick={onButtonClick}>
                    Back to homepage
                </Button>
            </div>
        </div>
    );
};

export default NotFound;