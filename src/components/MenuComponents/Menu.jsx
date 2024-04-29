import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const Menu = ({ setStatusPage, rol }) => {
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Button variant="contained" onClick={() => setStatusPage(2)}>
        Ver Empleados
      </Button>

      {rol === 1 && (
        <Button variant="contained" onClick={() => setStatusPage(4)}>
          Ver Solicitudes
        </Button>
      )}
    </Box>
  );
};

export default Menu;
