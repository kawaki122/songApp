export function authHeader() {
    // return authorization header with basic auth credentials
    let user = JSON.parse(localStorage.getItem("user"));
  
    if (user && user.token) {
      return { Authorization: "Basic " + user.token };
    } else {
      return {};
    }
  }
  
  export function headerType() {
    return { "Content-Type": "application/json" };
  }