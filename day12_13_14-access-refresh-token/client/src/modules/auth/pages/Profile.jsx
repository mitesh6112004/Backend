import { useEffect } from "react";
import useApi from "../../../shared/useApi";
import { useAuthContext } from "../context/useAuthContext"


const Profile = () => {

  const authContext = useAuthContext();
  const api = useApi();

  async function fetchProfile() {
    
    const response = await api.get("/auth/me");

    authContext.setUser(response.data.data.user);
  }

  useEffect(() => {
    fetchProfile()
  },[])

  return (
   <main>
    <h1>Profile</h1>
    <p>Name : {authContext.user?.name}</p>
    <p>Email : {authContext.user?.email}</p>
   </main>
  )
}

export default Profile
