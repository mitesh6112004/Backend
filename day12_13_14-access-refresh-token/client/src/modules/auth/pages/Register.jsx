import  { useState } from "react";
import useApi from "../../../shared/useApi"
import { useAuthContext } from "../context/useAuthContext";
import { useNavigate } from "react-router";

const Register = () => {

    const api = useApi();
    const authContext = useAuthContext();

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        console.log("Form Submitted");
        

        const response = await api.post("/auth/register", {
            name, email, password
        })


        console.log(response.data.data.user);
        authContext.setAccessToken(response.data.accessToken);
        authContext.setUser(response.data.data.user);

        navigate("/profile");
        
    }

  return (
    <main>
      <form
        className="flex flex-col w-[500px] gap-5 p-4 border-2 m-2 rounded-sm"
        onSubmit={handleSubmit}
      >
        <input
          className="border-2 p-2 rounded-sm"
          value={name}
          onChange={e => 
            setName(e.target.value)
          }
          type="text"
          placeholder="enter name"
        />
        <input
          className="border-2 p-2 rounded-sm"
          value={email}
          onChange={e => 
            setEmail(e.target.value)
          }
          type="email"
          placeholder="enter email"
        />
        <input
          className="border-2 p-2 rounded-sm"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="enter password"
        />
        <button className="p-3 bg-blue-500 text-white rounded-sm">Register</button>
      </form>
    </main>
  );
}

export default Register
