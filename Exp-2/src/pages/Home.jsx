import Button from '../components/Button.jsx';
import Dropdown from '../components/Dropdown.jsx';
import TextField from '../components/TextField.jsx';

export default function Home() {
    return (
        <div className="home-container">
            <h1>Welcome to Home</h1>
            <Button />
            <Dropdown />
            <TextField />
        </div>
    );
}