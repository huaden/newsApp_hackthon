const grabResponse = async (url) => {
  const response = await fetch(
    url, {
        method: 'GET',
        mode: 'no-cors',
        credentials: 'same-origin',
        headers: {
            'Authorization': 'Bearer {tfp_4gmc9xPzT3HMoPX6wUjdFLaLeoc5krEwZGcjbHAeKN8C_3srKuTCvEP6wCN}',
            'Content-Type': 'application/json'
        }
    }
    );
  const data = await response.json();
  return data;
}

export default grabResponse;