import { useState, useEffect } from "react";
import axios from 'axios';
import { Project } from "../store/investmentSlice";

export const useFetch = (url: string) => {
    const [data, setData] = useState<Project[] | undefined>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});

    interface ResponseObject{
        projects: Project[]
    }

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get<ResponseObject>(url);
                setLoading(false);
                setData(response.data.projects);
            }
            catch(err) {
                setLoading(false);
                setError(
                    {error: {msg: 'Resources could not be found at this moment'}}
                )
            }
        }

        setLoading(true);
        fetchData();    
    }, [url]);
    
    return { data, loading, error }
}