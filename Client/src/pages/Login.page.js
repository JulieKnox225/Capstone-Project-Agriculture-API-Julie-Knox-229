import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { Link, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';

function LoginPage() {
    const userRef = useRef();
    const errRef = useRef();

    const { setAuth } = useAuth();
    
    const [enabled, setEnabled] = useState(false);
    
    const [input, setInput] = useState(
        {
            name: '',
            password: ''
        }
    );

    useEffect(() => {
        userRef.current.focus();
    }, []);

    const fetchLogin = (param) => {
        setEnabled(false);
        return axios.post('/login', param, { withCredentials: true });
    }

    const { data, isError, error, isLoading } = useQuery('login', () => fetchLogin(input), { enabled });

    if(data) {
        setAuth(prev => ({ ...prev, accessToken: data.data.data}))
        return <Navigate to={'/'} />;
    }
        
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
            { isError && 
                <h2 ref={errRef} aria-live="assertive">{error.response.data.message}</h2> 
            }
            { !data &&
                <form onSubmit={(e) => {
                    e.preventDefault();
                    setEnabled(true);
                }}
                >
                    <label htmlFor="name">Username:</label>
                    <input
                        type="text"
                        placeholder="Username"
                        name="name"
                        ref={userRef}
                        required
                        value={input.name}
                        onChange={handleChange}
                    ></input>
                    
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
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

export default LoginPage;