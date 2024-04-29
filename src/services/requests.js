const API_BASE_URL = "http://localhost:4000";

export const getAllRequest = async (token) => {
  try {
    const url = `${API_BASE_URL}/request`;
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

export const createRequest = async (token, body) => {
  try {
    const url = `${API_BASE_URL}/request`;
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

export const deleteRequestById = async (token, requestId) => {
  try {
    const url = `${API_BASE_URL}/request/${requestId}`;
    const req = await fetch(url, {
      method: "DELETE",
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
