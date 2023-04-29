import { useState } from "react";
import { useQuery } from 'react-query';
import axios from 'axios';


function AddEntryPage() {
    const [input, setInput] = useState(
        {
            name: '', 
            nickname: '', 
            tempRangeHigh: '', 
            tempRangeLow: '', 
            sowTemp: '', 
            fertilizerNPK: '', 
            companionPlantId: '', 
            description: ''
        }
    );

    const [enabled, setEnabled] = useState(false);
    
    const fetchApi = (input) => {
        setEnabled(false);
        return fetch('http://localhost:5000/plants',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(input)
            }
        )
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
            { data && <h2>{data.data}</h2>}
            { isError && <h2>{error.message}</h2>}
            { isLoading && <h2>Loading...</h2>}
            <form onSubmit={(e) => {
                    e.preventDefault();
                    console.log(input)
                    setEnabled(true);
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
                    placeholder="Temp Range High here"
                    name='tempRangeHigh'
                    value={input.tempRangeHigh}
                    onChange={handleChange}
                ></input> 
                <input
                    type="text" 
                    placeholder="Temp Range Low here"
                    name='tempRangeLow'
                    value={input.tempRangeLow}
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
                    placeholder="Companion PLant id here"
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
                <button>Add</button>
            </form>
        </div>
     );
}

export default AddEntryPage;