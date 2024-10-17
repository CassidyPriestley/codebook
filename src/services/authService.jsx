export async function login(authDetail) {
  const requestOptions = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(authDetail),
  };
  const res = await fetch(
    `${process.env.REACT_APP_HOST}/login`,
    requestOptions
  );
  if (!res.ok) {
    const errorMessage = {
      message: res.statusText,
      statusCode: res.status,
    };
    throw errorMessage;
  }
  const data = await res.json();

  if (data.accessToken) {
    sessionStorage.setItem("token", JSON.stringify(data.accessToken));
    sessionStorage.setItem("cbid", JSON.stringify(data.user.id));
  }
  return data;
}

export async function register(authDetail) {
  const requestOptions = {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify(authDetail),
  };
  const res = await fetch(
    `${process.env.REACT_APP_HOST}/register`,
    requestOptions
  );
  if (!res.ok) {
    const errorMessage = {
      message: res.statusText,
      statusCode: res.status,
    };
    throw errorMessage;
  }
  const data = await res.json();

  if (data.accessToken) {
    sessionStorage.setItem("token", JSON.stringify(data.accessToken));
    sessionStorage.setItem("cbid", JSON.stringify(data.user.id));
  }
  return data;
}

export function logout() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("cbid");
}
