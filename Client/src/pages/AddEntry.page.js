import { useState } from "react";
import { useQuery } from 'react-query';
import axios from 'axios';


function AddEntryPage() {
    const [input, setInput] = useState(
        {
            name: '', 
            nickname: '', 
            monthsToPlant: '', 
            sunReq: '',
            plantingZone: '', 
            sowTemp: '', 
            fertilizerNPK: '', 
            companionPlantId: '', 
            description: '',
            avoidPlantId: ''
        }
    );

    const [enabled, setEnabled] = useState(false);
    
    const fetchApi = (input) => {
        setEnabled(false);
        return axios.post('http://localhost:5000/plants', input);
    }

    const { data, isError, isLoading, error } = useQuery('addEntry', () => fetchApi(input),
        {
            enabled
        }
    );

    function handleChange(e) {
        const {name, value} = e.target;
        setInput(prev => {
            return {
                ...prev,
                [name]: value
            }
        });
    }

    return ( 
        <div>
            { isLoading && <h2>Loading...</h2>}
            { isError && <h2>{error.response.data.message.message}</h2>}
            {/* { data && <h2>{data.data}</h2>} */}
            <form onSubmit={(e) => {
                    e.preventDefault();
                    //Unsure if this will work - must try again
                    setEnabled(true);
                    // if(!isLoading) {
                    //     setInput(
                    //         {
                    //             name: '', 
                    //             nickname: '', 
                    //             monthsToPlant: '', 
                    //             plantingZone: '', 
                    //             sowTemp: '', 
                    //             fertilizerNPK: '', 
                    //             companionPlantId: '', 
                    //             description: '',
                    //             avoidPlantId: ''
                    //         }
                    //     );
                    // }
                }}
            >
                <input
                    type="text" 
                    placeholder="Name here"
                    name='name'
                    value={input.name}
                    onChange={handleChange}
                ></input> 
                <input
                    type="text" 
                    placeholder="Nickname here"
                    name='nickname'
                    value={input.nickname}
                    onChange={handleChange}
                ></input> 
                <input
                    type="text" 
                    placeholder="Months here"
                    name='monthsToPlant'
                    value={input.monthsToPlant}
                    onChange={handleChange}
                ></input> 
                <input
                    type="text" 
                    placeholder="Sun Required here"
                    name='sunReq'
                    value={input.sunReq}
                    onChange={handleChange}
                ></input> 
                <input
                    type="text" 
                    placeholder="Planting Zone here"
                    name='plantingZone'
                    value={input.plantingZone}
                    onChange={handleChange}
                ></input> 
                <input
                    type="text" 
                    placeholder="Sow Temp here"
                    name='sowTemp'
                    value={input.sowTemp}
                    onChange={handleChange}
                ></input> 
                <input
                    type="text" 
                    placeholder="Fertilizer here"
                    name='fertilizerNPK'
                    value={input.fertilizerNPK}
                    onChange={handleChange}
                ></input> 
                <input
                    type="text" 
                    placeholder="Companion Plant id here"
                    name='companionPlantId'
                    value={input.companionPlantId}
                    onChange={handleChange}
                ></input> 
                <input
                    type="text" 
                    placeholder="Description here"
                    name='description'
                    value={input.description}
                    onChange={handleChange}
                ></input> 
                <input
                    type="text" 
                    placeholder="Plants to avoid here"
                    name='avoidPlantId'
                    value={input.avoidPlantId}
                    onChange={handleChange}
                ></input> 
                <button>Add</button>
            </form>
        </div>
     );
}

export default AddEntryPage;