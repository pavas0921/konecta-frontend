import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { loginAPI } from "../../services/login";
import styles from "./styles.module.scss";
import { Context } from "../../context";
import { decodeToken } from "../../helpers/verifyToken";

const LoginForm = ({ setStatusPage }) => {
  const [loader, setLoader] = useState(false);
  const [loginData, setLoginData] = useState({});
  const context = useContext(Context);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = async (body) => {
    setLoader(true);
    const loginResponse = await loginAPI(body);
    setLoginData(loginResponse);
    context.data.login = loginResponse;
    setLoader(false);
  };

  const onSubmit = (body) => {
    context.data.login = body;
    login(body);
  };

  const messages = {
    req: "Este campo es obligatorio",
  };

  useEffect(() => {
    if (context.data.login.httpStatus === 200 && context.data.login.content) {
      sessionStorage.setItem("token", context.data.login.content);
      setStatusPage(1);
      decodeToken();
    }
  }, [context.data.login]);

  return (
    <Card sx={{ maxWidth: 350 }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ mb: 3 }}>
          Inicio de Sesión
        </Typography>

        <Box className={styles.box_form}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <TextField
              {...register("email", { required: messages.req })}
              size="small"
              type="email"
              name="email"
              label="Email"
              variant="outlined"
              className={styles.input}
              helperText={errors.email && errors.email.message}
            />
            <TextField
              {...register("contrase_a", { required: messages.req })}
              size="small"
              type="password"
              name="contrase_a"
              label="Contraseña"
              variant="outlined"
              className={styles.input}
              helperText={errors.contrase_a && errors.contrase_a.message}
            />

            <Button variant="contained" type="submit">
              Iniciar Sesión
            </Button>
          </form>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
