const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const [scheme, token] = authHeader.split(' ');

    if (scheme && scheme.toLowerCase() === 'bearer' && token) {
      try {
        const payload = jwt.verify(token, SECRET_KEY);

        const { email, exp, active, firstname, lastname } = payload;

        if (!email || !exp || active === undefined || !firstname || !lastname) {
          return res.status(400).json({ error: 'Token inválido: campos faltantes' });
        }

        const now = Math.floor(Date.now() / 1000); 
        if (exp < now) {
          return res.status(401).json({ error: 'Token expirado' });
        }

        if (!active) {
          return res.status(403).json({ error: 'Usuario inactivo' });
        }

        req.user = {
          email,
          firstname,
          lastname,
          active,
        };

        next();
      } catch (err) {
        console.error('Error al verificar el token:', err);
        return res.status(401).json({ error: 'Token inválido o expirado' });
      }
    } else {
      return res.status(400).json({ error: 'Formato del token inválido' });
    }
  } else {
    return res.status(401).json({ error: 'Se requiere autenticación' });
  }
};

module.exports = authMiddleware;