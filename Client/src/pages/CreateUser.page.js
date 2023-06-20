import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from 'react-router-dom';
import axios from "../api/axios";

function CreateUserPage({ token, setToken }) {
    
    const [enabled, setEnabled] = useState(false);
    
    const [input, setInput] = useState(
        {
            name: '',
            password: ''
        }
    );

    const fetchCreateUser = (param) => {
        setEnabled(false);
        return axios.post(`/user`, param, { withCredentials: true });
    }

    const { data, isError, error, isLoading } = useQuery('profile', () => fetchCreateUser(input), { enabled });
        
    function handleChange(e) {
        const { name, value } = e.target;
        setInput(prev => {
            return {
                ...prev,
                [name]: value
            }
        });
    }

    return (
        <div>
            { isLoading && <h2>Loading...</h2> }
            { isError && <h2>{error.response.data.message.message}</h2> }
            { !data &&
                <form onSubmit={(e) => {
                    e.preventDefault();
                    setEnabled(true);
                    }}
                >
                    <input
                        type="text"
                        placeholder="Username"
                        name="name"
                        value={input.name}
                        onChange={handleChange}
                    ></input>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={input.password}
                        onChange={handleChange}
                    ></input>
                    <button>Submit</button>
                </form> 
            }
            { data && <Link to='/profile'>Go back to Profile!</Link> }
        </div>
    )
}

export default CreateUserPage;