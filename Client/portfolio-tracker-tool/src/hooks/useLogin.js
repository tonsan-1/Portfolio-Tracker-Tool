import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (username, password) => {
        setIsLoading(true);
        setError(null);

        var data = {
            username,
            password
        }

          var requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(data),
            redirect: 'follow'
          };

          const response = await fetch("https://localhost:44377/api/Authentication/Login", requestOptions);

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false)
            setError(json.message)
            return;
        }

        localStorage.setItem('user', JSON.stringify(json));
        dispatch({ type: 'LOGIN', payload: json });

        setIsLoading(false);
    }

    return { login, isLoading, error }
}