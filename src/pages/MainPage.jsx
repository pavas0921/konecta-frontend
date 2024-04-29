import React, { useState } from "react";
import LoginForm from "../components/LoginComponents/LoginForm";
import { EmployeesForm, EmployesList } from "../components/EmployeesComponents";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Menu } from "../components/MenuComponents";
import { ModalComponent } from "../components/ModalComponent/";
import Typography from "@mui/material/Typography";
import { RequestForm } from "../components/RequestComponents/RequestForm";
import RequestList from "../components/RequestComponents/RequestList/RequestList";

const MainPage = () => {
  const [statusPage, setStatusPage] = useState(0);
  const rol = +sessionStorage.getItem("rol");

  return (
    <Box sx={{ width: "100%" }}>
      {statusPage === 0 && (
        <Box>
          <LoginForm setStatusPage={setStatusPage} />
        </Box>
      )}

      {statusPage === 1 && (
        <Box sx={{ width: "100%" }}>
          <Menu setStatusPage={setStatusPage} rol={rol} />
        </Box>
      )}

      {statusPage === 2 && (
        <Box>
          <EmployesList />
          {rol === 1 && (
            <Button
              sx={{ mt: 3 }}
              variant="contained"
              onClick={() => setStatusPage(3)}
            >
              Registrar Empleado
            </Button>
          )}
          <Button
            sx={{ mt: 3 }}
            variant="contained"
            onClick={() => setStatusPage(1)}
          >
            Volver al Menú
          </Button>
        </Box>
      )}

      {statusPage === 3 && (
        <Box>
          <EmployeesForm setStatusPage={setStatusPage} />
        </Box>
      )}

      {statusPage === 4 && (
        <Box>
          <RequestList setStatusPage={setStatusPage} />
          <Button
            sx={{ mt: 3 }}
            variant="contained"
            onClick={() => setStatusPage(5)}
          >
            Registrar Solicitud
          </Button>
          <Button
            sx={{ mt: 3 }}
            variant="contained"
            onClick={() => setStatusPage(1)}
          >
            Volver al Menú
          </Button>
        </Box>
      )}

      {statusPage === 5 && (
        <Box>
          <RequestForm setStatusPage={setStatusPage} />
        </Box>
      )}
    </Box>
  );
};

export default MainPage;
