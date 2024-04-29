import { jwtDecode } from "jwt-decode";

export const decodeToken = () => {
  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const { rol_id } = decodedToken;
  const exp = decodedToken?.exp;
  const tokenExpDate = new Date(exp * 1000);
  sessionStorage.setItem("rol", rol_id);
  sessionStorage.setItem("expiration", tokenExpDate);
};

export const verifyTokenExpiration = () => {
  const tokenExpDate = sessionStorage.getItem("expiration");
  const currentTime = new Date(Date.now());
  if (currentTime > tokenExpDate) {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("rol");
    sessionStorage.removeItem("exp");
    return false;
  } else {
    return true;
  }
};
