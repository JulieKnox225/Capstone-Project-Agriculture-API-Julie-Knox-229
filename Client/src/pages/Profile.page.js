import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from 'react-router-dom';
import axios from 'axios';
import PostSnippet from '../components/PostSnippet';

//check if logged in:
    //true: display saved list
    //false: display log in menu or create user menu

function ProfilePage({ token, setToken }) {
    const [enabled, setEnabled] = useState(false);

    const fetchProfile = () => {
        return axios.get("http://localhost:5000/saved")
    }
    const { data, isError, error, isLoading } = useQuery('profile', fetchProfile, { enabled });

    return ( 
        <div>
            { token === '' && 
                <>
                    <Link to={'/login'}>Login</Link>
                    <br/>
                    <Link to={'/user'}>Create User</Link>
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