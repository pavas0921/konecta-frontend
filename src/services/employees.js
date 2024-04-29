const API_BASE_URL = "http://localhost:4000";

export const getAllEmployees = async (token) => {
  try {
    const url = `${API_BASE_URL}/employees`;
    const req = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await req.json();
    return Promise.resolve(data);
  } catch (error) {
    return Promise.resolve(error);
  }
};

export const createEmployee = async (token, body) => {
  try {
    const url = `${API_BASE_URL}/employees`;
    const req = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await req.json();
    return Promise.resolve(data);
  } catch (error) {
    return Promise.resolve(error);
  }
};
