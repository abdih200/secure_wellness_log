export const BASE_URL = 'http://10.0.2.2:5000'; 

export const login = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    return await response.json();
  } catch (error) {
    console.error('Login API Error:', error);
    return { error: 'Could not connect to server' };
  }
};
