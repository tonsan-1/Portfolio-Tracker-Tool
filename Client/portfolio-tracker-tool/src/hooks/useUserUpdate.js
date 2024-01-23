import { useAuthContext } from "../hooks/useAuthContext";
import { API } from '../services/API';

export const useUserUpdate = () => {
    const { user, dispatch } = useAuthContext();

    const updateUser = async (firstname, lastname) => {
        var data = {
            username: user.username,
            firstname,
            lastname
        }

        await API.updateUser(data, user)
            .then(response => {
                var currUser = JSON.parse(localStorage.getItem('user'));

                currUser.firstName = response.firstName;
                currUser.lastName = response.lastName;

                localStorage.setItem('user', JSON.stringify(currUser));
                dispatch({ type: 'UPDATE', payload: response });
            });
    }

    return { updateUser }
}