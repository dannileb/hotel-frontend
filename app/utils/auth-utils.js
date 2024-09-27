export const setJWT = (jwt) => {
  document.cookie = `jwt=${jwt}`;
  localStorage.setItem("jwt", jwt);
};

export const getJWT = () => {
  if (document.cookie === "") {
    return localStorage.getItem("jwt");
  }
  const jwt = document.cookie.split(";").find((item) => item.includes("jwt"));
  return jwt ? jwt.split("=")[1] : null;
};

export const removeJWT = () => {
  document.cookie = "jwt=;";
  localStorage.removeItem("jwt");
};
