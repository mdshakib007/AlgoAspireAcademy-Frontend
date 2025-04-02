import { React } from 'react';
import Header from '../components/ProfileComponents/Header';
import { useParams } from 'react-router-dom';

const Profile = () => {
    const { username } = useParams();

    return (
        <>
            <Header username={username}></Header>
        </>
    );
};

export default Profile;