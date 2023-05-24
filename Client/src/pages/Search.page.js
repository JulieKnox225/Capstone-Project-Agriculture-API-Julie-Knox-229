import { useState } from "react";
import { useQuery } from 'react-query';
import axios from "axios";
import PostSnippet from '../components/PostSnippet';

function SearchPage({ token }) {
    const [input, setInput] = useState('');
    const [enabled, setEnabled] = useState(false);

    const fetchAPI = () => {
        setEnabled(false);
        return axios.get(`http://localhost:5000/plants?search=${input}`);
    }

    const { data, isLoading, isError, error } = useQuery('search', fetchAPI, { enabled });
    
    console.log(data === undefined ? data : data.data)

    return ( 
        <div>
            <div>
                <form onSubmit={e => {
                    e.preventDefault();
                    setEnabled(true);
                }}>
                    <input
                        type="text"
                        placeholder="Plant Names Only Please!"
                        name="search"
                        value={input}
                        onChange={e => {setInput(e.target.value)}}
                    ></input>
                    <button>Search</button>
                </form>
                <h3>Search Results:</h3>
                { isLoading && <h2>Loading...</h2>}
                { isError && <h2>{error.message}</h2>}
                { data &&
                    data.data.map(item => {
                        return item.id 
                        ? (
                            <PostSnippet 
                                key={item.id}
                                plantName={item.name}
                                plantTempRange={`${item.sow_temp_range}f`}
                                plantZone={item.planting_zone}
                                plantSunReq={`${item.sun_req} sun`}
                                plantDescription='To be added...'
                            />
                        )
                        : <PostSnippet key={Math.random()} plantName={item.name}/>;
                    })
                }
            </div>
        </div>
     );
}

export default SearchPage;