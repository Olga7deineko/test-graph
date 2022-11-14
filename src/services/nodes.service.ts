import axios from 'axios';

export const getNodes = async () => {
    const response = await axios.get('data.json'
        , {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    );
    return response?.data;
}