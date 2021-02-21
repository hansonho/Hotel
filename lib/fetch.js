export async function fetchDataByGet(method, id) {
  const data = {
    url: id ? `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${id}` : 'https://challenge.thef2e.com/api/thef2e2019/stage6/rooms',
    method: method,
    headers: {
      contentType: 'application/json',
      authorization: 'Bearer II3zjXUaIVUpKic9if2C9TMa6XAqqL9OarJDHJcSQryQblQBWPQZtWxL5wbS',
    }
  }
  return await fetch(data.url, {
    method: data.method,
    headers: data.headers,
  })
    .then(res => {
      return res.json();
    })
    .catch(err => {
      return err;
    })
}