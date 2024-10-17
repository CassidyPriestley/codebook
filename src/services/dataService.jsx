function getSession() {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const cbid = JSON.parse(sessionStorage.getItem("cbid"));
  return { token: token, id: cbid };
}

export async function getUser() {
  const browserData = getSession();
  const requestOption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${browserData.token}`,
    },
  };
  const res = await fetch(
    `${process.env.REACT_APP_HOST}/600/users/${browserData.id}`,
    requestOption
  );
  if (!res.ok) {
    throw {
      message: res.statusText,
      statusCode: res.status,
    }; //eslint-disable-line
  }
  const data = await res.json();
  return data;
}

export async function getUserOrders() {
  const browserData = getSession();
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${browserData.token}`,
    },
  };
  const res = await fetch(
    `${process.env.REACT_APP_HOST}/660/orders?user.id=${browserData.id}`,
    requestOptions
  );
  if (!res.ok) {
    throw {
      message: res.statusText,
      statusCode: res.status,
    }; //eslint-disable-line
  }
  const data = await res.json();
  return data;
}

export async function createOrder(cartList, total, user) {
  const browserData = getSession();
  const order = {
    cartList: cartList,
    amount_paid: total,
    quantity: cartList.length,
    user: {
      name: user.name,
      email: user.email,
      id: user.id,
    },
  };
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${browserData.token}`,
    },
    body: JSON.stringify(order),
  };
  const res = await fetch(
    `${process.env.REACT_APP_HOST}/660/orders`,
    requestOptions
  );
  if (!res.ok) {
    throw {
      message: res.statusText,
      statusCode: res.status,
    }; //eslint-disable-line
  }
  const data = await res.json();
  return data;
}
