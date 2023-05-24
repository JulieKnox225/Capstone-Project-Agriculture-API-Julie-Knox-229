import { useQuery } from "react-query";
import PostSnippet from "../components/PostSnippet";
import axios from 'axios';

const fetchApi = () => {
    return axios.get('http://localhost:5000/plants');
}

function HomePage({ token }) {
    const { data, isLoading, isError, error } = useQuery('getPlants', fetchApi, {enabled: true});
    console.log(data)

    return ( 
        <>
            { isLoading && <h2>Loading...</h2>}
            { isError && <h2>{error.message}</h2>}
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