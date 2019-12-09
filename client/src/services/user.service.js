import { authHeader, headerType } from "../auth-header";

export const userService = {
  login,
  logout,
  signup,
  getAll
};

function login(name, password) {
  const requestOptions = {
    method: "POST",
    headers: headerType(),
    body: JSON.stringify({ email: name, password })
  };

  return fetch(`/api/v1/login`, requestOptions)
    .then(handleResponse)
    .then(data => {
      if (data) {
        let user ={};
        user.token = data.token;
        user.user = data.result.name;
        localStorage.setItem("user", JSON.stringify(user));
      }

      return data;
    });
}
function signup(name, password) {
  const requestOptions = {
    method: "POST",
    headers: headerType(),
    body: JSON.stringify({ name, password })
  };

  return fetch(`/api/v1/users`, requestOptions)
    .then(handleResponse)
    .then(data => {
      if (data) {
        let user ={};
        user.token = data.token;
        user.user = name;
        localStorage.setItem("user", JSON.stringify(user));
      }

      return data;
    });
}
function logout() {
  localStorage.removeItem("user");
}

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(`/api/v1/users`, requestOptions).then(
    handleResponse
  );
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        logout();
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
