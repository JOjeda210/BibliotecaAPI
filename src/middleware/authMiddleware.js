const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // 1. Obtener el token del encabezado de la autorización
  const authHeader = req.headers.authorization;

  // 2. Si no hay token, enviar una respuesta de error 401
  if (!authHfeader) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  // 3. Extraer el token (eliminar "Bearer ")
  const token = authHeader.split(' ')[1];

  // 4. Verificar el token usando la clave secreta
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guardar la información del usuario en el objeto de la solicitud
    next(); // Continuar a la siguiente función del middleware o controlador
  } catch (err) {
    // Si el token es inválido, enviar un error 401
    return res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = {
  verifyToken
};