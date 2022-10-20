import css from "./index.module.scss";
import DefaultLayout from "../../layouts/DefaultLayout";
import LoginForm from "./LoginForm";
import useAxios from "../../api/useAxios";
import useDatastore from "../../datastore/useDatastore";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function LoginPage() {
  const axios = useAxios();
  const { setAccessToken, setUser, addMessage, removeMessage } = useDatastore();
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const [warning, setWarning] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    addMessage("error", error);
  }, [error]);

  function onLoginAttempt(username, password) {
    axios
      .post("/api/users/login", {
        username,
        password,
      })
      .then((response) => {
        if (response.status === 200) {
          setAccessToken(response.data.token);
          setUser(response.data.user);
          removeMessage("error", error);
          navigate("/");
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            setWarning({
              username: "Invalid username or password",
              password: "Invalid username or password",
            });
          } else {
            setError("Server is offline, try again later");
          }
        } else if (error.request) {
          setError("Access denied, try again later");
        } else {
          setError("Something went wrong, try again later");
        }
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.username.length > 0 && values.password.length > 0) {
      onLoginAttempt(values.username, values.password);
    } else if (values.username.length === 0 && values.password.length === 0) {
      setWarning({
        username: "Username is required",
        password: "Password is required",
      });
    } else if (values.username.length === 0) {
      setWarning({
        username: "Username is required",
        password: "",
      });
    } else if (values.password.length === 0) {
      setWarning({
        username: "",
        password: "Password is required",
      });
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <DefaultLayout>
      <div className={css.alignmentWrapper}>
        <LoginForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          onLoginAttempt={onLoginAttempt}
          warning={warning}
          setWarning={setWarning}
        />
      </div>
    </DefaultLayout>
  );
}

export default LoginPage;
