import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { verifyTokenExpiration } from "../../helpers/verifyToken";
import { getAllEmployees } from "../../services/employees";
import { Context } from "../../context";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

const EmployesList = ({ setStatusPage }) => {
  const context = useContext(Context);
  const [rol, setRol] = useState();
  const [loader, setLoader] = useState(false);
  const [employees, setEmployees] = useState([]);
  const token = sessionStorage.getItem("token");

  const fetchEmployees = async () => {
    setLoader(true);
    const token = sessionStorage.getItem("token");
    const employeesResponse = await getAllEmployees(token);
    context.data.employees = employeesResponse;
    setLoader(false);
  };

  useEffect(() => {
    setRol(sessionStorage.getItem("rol"));
  }, []);

  useEffect(() => {
    if (+rol === 1 || +rol === 2) {
      fetchEmployees();
    }
  }, [rol]);

  return (
    <Box>
      <Typography variant="h4" color="initial" sx={{ mb: 3 }}>
        Lista de Empleados
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Nombre</TableCell>
              <TableCell align="right">Fecha Ingreso</TableCell>
              <TableCell align="right">Salario</TableCell>
            </TableRow>
          </TableHead>
          {context.data.employees && context.data.employees.length > 0 && (
            <TableBody>
              {context.data.employees.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.nombre}</TableCell>
                  <TableCell align="right">{row.fecha_ingreso}</TableCell>
                  <TableCell align="right">{row.salario}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EmployesList;
