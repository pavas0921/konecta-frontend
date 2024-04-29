import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { Context } from "../../../context";
import { createRequest } from "../../../services/requests";

const RequestForm = ({ setStatusPage }) => {
  const context = useContext(Context);
  const [loader, setLoader] = useState(false);
  const [requests, setRequests] = useState([]);
  const token = sessionStorage.getItem("token");

  const registerRequest = async (body) => {
    setLoader(true);
    const requestResponse = await createRequest(token, body);
    if (requestResponse.httpStatus === 201) {
      setRequests((prevRequests) => [...prevRequests, requestResponse.content]);
      context.data.request = requests;
      setStatusPage(4);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (body) => {
    registerRequest(body);
  };

  const messages = {
    req: "Este campo es obligatorio",
  };

  return (
    <Box>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <TextField
          {...register("codigo", { required: messages.req })}
          size="small"
          type="text"
          name="codigo"
          label="Código"
          variant="outlined"
          helperText={errors.codigo && errors.codigo.message}
          sx={{ mb: 2 }}
        />
        <TextField
          {...register("descripcion", { required: messages.req })}
          size="small"
          type="text"
          name="descripcion"
          label="Descripcion"
          variant="outlined"
          helperText={errors.descripcion && errors.descripcion.message}
          sx={{ mb: 2 }}
        />
        <TextField
          {...register("resumen", { required: messages.req })}
          size="small"
          type="text"
          name="resumen"
          label="Resumen"
          variant="outlined"
          helperText={errors.resumen && errors.resumen.message}
          sx={{ mb: 2 }}
        />
        <TextField
          {...register("id_empleado", { required: messages.req })}
          size="small"
          type="text"
          name="id_empleado"
          label="Empleado"
          variant="outlined"
          helperText={errors.id_empleado && errors.id_empleado.message}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" type="submit">
          Registrar Solicitud
        </Button>
      </form>
    </Box>
  );
};

export default RequestForm;
