// controllers/authController.js
const pool = require('../configs/db');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { usuario, senha } = req.body;
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE usuario = ? AND senha = ?', [usuario, senha]);

  if (rows.length > 0) {
    const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    await pool.query('UPDATE usuarios SET token = ? WHERE id = ?', [token, rows[0].id]);
    res.json({ token });
  } else {
    res.status(401).send('Usuário ou senha inválidos');
  }
};

exports.logout = async (req, res) => {
  const { token } = req.body;
  await pool.query('UPDATE usuarios SET token = NULL WHERE token = ?', [token]);
  res.send('Logout realizado com sucesso');
};