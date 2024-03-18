import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";


const LoginSection = (props) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(true);

  const history = useHistory();

  const handleSubmit = () => {

      if (username === "" || password === "" ) {
        setStatus(false);
        return;
      }

      fetch('http://127.0.0.1:5000/login' , {
        method:'POST',
        body: JSON.stringify({
          "Username": username,
          "password": password,
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then ( (res) => {
        if (!res.ok) {
          throw new Error("Login error");
        }
        
        return res.json();
        
      })
      .then ( (data) => {
        
        if (data.message === "Login Failed") {
          props.setLoginStatus(false);
          setStatus(false);
          return;
        }
        props.setLoginStatus(true);
        history.push('/inventory');
        setStatus(true);
      })
      .catch( (e) => {
        console.log(e.message);
      })

  }
  
  return (
      <div className="main-login-section flex justify-center items-center  bg-blue-gray-100">

          <div className="login w-fit p-10 rounded-lg">
              <Card color="transparent" shadow={false} className=" min-w-fit flex justify-center items-center" >
                  <Typography variant="h4" color="blue-gray" className="text-center mb-2">
                      Sign In
                  </Typography>
                  <Typography color="gray" className="font-normal">
                      Nice to meet you! Enter your details.
                      <span style={{ display: status ? "none" : "block", color: "red" }}>Enter valid username or password</span>
                  </Typography>
                  <form className="mt-8 mb-2 w-52 sm:w-96">
                      <div className="mb-1 flex flex-col gap-6 ">
                          <Typography variant="h6" color="blue-gray" className="-mb-3">
                              User Name
                          </Typography>
                          <Input
                              size="lg"
                              placeholder="name@mail.com"
                              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                              labelProps={{
                                  className: "before:content-none after:content-none",
                              }}
                              onChange={(event) => {
                                  setUsername(event.target.value);
                              }}
                              value={username}
                              required
                          />

                          <Typography variant="h6" color="blue-gray" className="-mb-3" style={{ marginTop: "10px" }}>
                              Password
                          </Typography>
                          <Input
                              type="password"
                              size="lg"
                              placeholder="********"
                              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                              labelProps={{
                                  className: "before:content-none after:content-none",
                              }}
                              onChange={(event) => {
                                  setPassword(event.target.value);
                              }}
                              value={password}
                              required
                          />
                          <div className=" flex items-center gap-4"><span>Contributer?</span>
                          <input type="checkbox" defaultChecked className="checkbox " style={{
                            border: "1px solid black",
                          }}
                          checked={props.contributor}
                          onChange={(event) => {
                            props.setContributor(event.target.checked);
                          }}/></div>
                      </div>

                      <Button className="mt-6" fullWidth  onClick={handleSubmit}>
                          sign in
                      </Button>

                  </form>
              </Card>
          </div>

      </div>
  );
}

export default LoginSection;
