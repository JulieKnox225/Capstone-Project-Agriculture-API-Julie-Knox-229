import { useQuery } from "react-query";
import PostSnippet from "../components/PostSnippet";
import axios from 'axios';

const fetchApi = () => {
    return axios.get('http://localhost:5000/plants');
}

function HomePage() {
    const { data, isLoading, isError, error } = useQuery('getPlants', fetchApi, {enabled: true});



    return ( 
        <>
            { isLoading && <h2>Loading...</h2>}
            { isError && <h2>{error.message}</h2>}
            { data && <h2>{data.data}</h2>}
            <PostSnippet 
                plantName='Sunflower'
                plantTempRange='70-90f'
                plantZone='9b'
                plantSunReq='Full sun'
                plantDescription='Pretty :)'
            />
            <PostSnippet 
                plantName='Daisies'
                plantTempRange='60-80f'
                plantZone='8b'
                plantSunReq='Partial Sun'
                plantDescription='Cute :)'
            />
            <PostSnippet 
                plantName='Kale Bloom'
                plantTempRange='70-80f'
                plantZone='9b'
                plantSunReq='Partial'
                plantDescription="Yeah it's real"
            />
        </>
     );
}

export default HomePage;