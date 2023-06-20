import axios from '../api/axios';
import useAuth from './useAuth'

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        console.log('calling refresh')
        const response = await axios.get('/refresh', {
            withCredentials: true
        })

        setAuth(prev => ({ ...prev, accessToken: response.data.data }));
        
        return response.data.data;
    }
    
    return refresh;
};

export default useRefreshToken