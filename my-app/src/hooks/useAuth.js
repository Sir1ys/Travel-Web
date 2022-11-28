import { useSelector } from "react-redux";

export function useAuth() {

  const {email, token, id, isManager, login, name, surname, img} = useSelector(state => state.user.user);

  return {
    isAuth: !!email,
    email,
    token,
    id,
    isManager,
    login,
    name,
    surname, 
    img
  }
}
