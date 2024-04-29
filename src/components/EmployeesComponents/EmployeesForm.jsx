import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { Context } from "../../context";
import styles from "./styles/employeesForm.module.scss";
import { createEmployee } from "../../services/employees";
import { formatDate } from "../../helpers/formatDate";

const EmployeesForm = ({ setStatusPage }) => {
  const context = useContext(Context);
  const [loader, setLoader] = useState(false);
  const [employees, setEmployees] = useState([]);
  const token = sessionStorage.getItem("token");

  const registerEmployee = async (body) => {
    setLoader(true);
    const employeeResponse = await createEmployee(token, body);
    if (employeeResponse.httpStatus === 201) {
      setEmployees((prevEmployees) => [
        ...prevEmployees,
        employeeResponse.content,
      ]);
      context.data.empleados = employees;
      setStatusPage(2);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (body) => {
    const formatedDate = formatDate(body.fecha_ingreso);
    body.fecha_ingreso = formatedDate;
    body.rol_id = 2;
    registerEmployee(body);
  };

  useEffect(() => {
    setEmployees(context.data.employees);
  }, []);

  const messages = {
    req: "Este campo es obligatorio",
  };

  return (
    <Box className={styles.box_main}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Typography variant="h4" color="initial" sx={{ mb: 3 }}>
          Registro de Empleados
        </Typography>
        <TextField
          {...register("nombre", { required: messages.req })}
          size="small"
          type="text"
          name="nombre"
          label="Nombres"
          variant="outlined"
          helperText={errors.nombre && errors.nombre.message}
          className={styles.inputs}
        />
        <TextField
          {...register("fecha_ingreso", { required: messages.req })}
          size="small"
          type="date"
          name="fecha_ingreso"
          variant="outlined"
          helperText={errors.fecha_ingreso && errors.fecha_ingreso.message}
          className={styles.inputs}
        />
        <TextField
          {...register("salario", { required: messages.req })}
          size="small"
          type="number"
          name="salario"
          label="Salario"
          variant="outlined"
          helperText={errors.salario && errors.salario.message}
          className={styles.inputs}
        />

        <Button variant="contained" type="submit">
          Registrar Empleado
        </Button>
      </form>
    </Box>
  );
};

export default EmployeesForm;
