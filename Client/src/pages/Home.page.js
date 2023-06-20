import { useQuery } from "react-query";
import PostSnippet from "../components/PostSnippet";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios from '../api/axios';


function HomePage() {
    const axiosPrivate = useAxiosPrivate();
    
    const fetchApi = () => {
        return axiosPrivate.get('/plants');
    }
    const { data, isLoading, isError, error } = useQuery('getPlants', fetchApi, {enabled: true});

    return ( 
        <>
            { isLoading && <h2>Loading...</h2>}
            { isError && <h2>{error.response.data.message}</h2>}
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
        </>
     );
}

export default HomePage;