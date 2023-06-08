import { useState } from "react";
import { useQuery } from 'react-query';
import axios from "axios";
import PostSnippet from '../components/PostSnippet';

function SearchPage({ token }) {
    const [input, setInput] = useState('');
    const [type, setType] = useState('');
    const [enabled, setEnabled] = useState(false);

    const fetchAPI = () => {
        setEnabled(false);
        return axios.get(`http://localhost:5000/plants?search=${input}&type=${type}`);
    }

    let { data, isLoading, isError, error } = useQuery('search', fetchAPI, { enabled });

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
                        onChange={e => setInput(e.target.value)}
                    ></input>
                    <select name="type" value={type} onChange={e => setType(e.target.value)}>
                        <option value="">--Please choose an option--</option>
                        <option value="name">Name</option>
                        <option value="nickname">Nickname</option>
                        <option value="months_to_plant">Months to Plant</option>
                        <option value="sun_req">Sun Requirements</option>
                        <option value="planting_zone">Zone</option>
                        <option value="sow_temp_range">Sow Temp</option>
                        <option value="fertilizer_NPK">Fertilizer (NPK)</option>
                        <option value="description">Description</option>
                    </select>
                    <button>Search</button>
                </form>
                <h3>Search Results:</h3>
                { isLoading && <h2>Loading...</h2>}
                { isError && <h2>{error.response.data.message.message}</h2>}
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