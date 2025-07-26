const jwt = require('jsonwebtoken');
const JWT_SECRET = 'rahasia_super_aman';

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token tidak tersedia atau format salah' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // menyimpan id_dosen & username ke request
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token tidak valid', error: err });
  }
};
