// src/controllers/authController.js
const jwt = require('jsonwebtoken');

const login = (req, res) => {
  // 1. Obtiene el email y password del cuerpo de la petición
  const { email, password } = req.body;

  // 2. Simulación de verificación de credenciales
  if (email === "test@example.com" && password === "password123") {
    // 3. Si las credenciales son correctas, define el payload del token
    const payload = {
      id: "123", // Puedes usar un ID de usuario real aquí
      role: "user" // Puedes añadir información de roles
    };
    
    // 4. Genera el token JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h' // El token expira en 1 hora
    });

    // 5. Envía el token en la respuesta
    return res.status(200).json({ token });
  } else {
    // 6. Si las credenciales son incorrectas, envía un error
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }
};

module.exports = {
  login
};