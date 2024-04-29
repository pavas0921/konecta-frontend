import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { verifyTokenExpiration } from "../../../helpers/verifyToken";
import { Context } from "../../../context";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllRequest, deleteRequestById } from "../../../services/requests";

const RequestList = () => {
  const context = useContext(Context);
  const [rol, setRol] = useState();
  const [loader, setLoader] = useState(false);
  const [request, setRequest] = useState([]);
  const token = sessionStorage.getItem("token");

  const fetchRequest = async () => {
    setLoader(true);
    const token = sessionStorage.getItem("token");
    const requestResponse = await getAllRequest(token);
    context.data.requests = requestResponse.content;
    setLoader(false);
  };

  const deleteRequest = async (id) => {
    setLoader(true);
    const token = sessionStorage.getItem("token");
    const requestResponse = await deleteRequestById(token, id);
    if (requestResponse.httpStatus === 200) {
      const index = context.data.requests.findIndex((item) => item.id === id);
      const requests = [...context.data.requests];
      requests.splice(index, 1);
      context.data.requests = requests;
    }
    setLoader(false);
  };

  useEffect(() => {
    setRol(sessionStorage.getItem("rol"));
  }, []);

  useEffect(() => {
    if (+rol === 1) {
      fetchRequest();
    }
  }, [rol]);

  const handleDelete = (id) => {
    deleteRequest(id);
  };

  return (
    <Box>
      <Typography variant="h4" color="initial" sx={{ mb: 3 }}>
        Lista de Solicitudes
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Codigo</TableCell>
              <TableCell>Descripcion</TableCell>
              <TableCell>Resumen</TableCell>
              <TableCell>Empleado</TableCell>
            </TableRow>
          </TableHead>
          {context.data.requests && context.data.requests.length > 0 && (
            <TableBody>
              {context.data.requests.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.codigo}
                  </TableCell>
                  <TableCell>{row.descripcion}</TableCell>
                  <TableCell>{row.resumen}</TableCell>
                  <TableCell>{row.id_empleado}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleDelete(row.id)}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RequestList;
