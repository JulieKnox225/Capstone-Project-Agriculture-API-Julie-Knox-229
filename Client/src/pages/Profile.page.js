import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import PostSnippet from '../components/PostSnippet';

function ProfilePage() {
    const { auth } = useAuth();
    const [enabled, setEnabled] = useState(auth.accessToken ? false : true);

    const fetchProfile = () => {
        return axios.get("/saved")
    }
    const { data, isError, error, isLoading } = useQuery('profile', fetchProfile, { enabled });

    return ( 
        <div>
            { !auth.accessToken && 
                <>
                    <Link to={'/login'} >Login</Link>
                    <br/>
                    <br/>
                    <Link to={'/user'} >Create User</Link>
                </>
            }
            { isLoading && <h2>Loading...</h2> }
            { isError && <h2>{error.response.data.message.message}</h2> }
            { data && 
                data.data.map(item => {
                    return (
                        <PostSnippet 
                            key={item.id}
                            plantName={item.name}
                            plantTempRange={`${item.sow_temp_range}f`}
                            plantZone={item.planting_zone}
                            plantSunReq={`${item.sun_req} sun`}
                            plantDescription='To be added...'
                        />
                    );
                })
            }
        </div>
     );
}

export default ProfilePage;