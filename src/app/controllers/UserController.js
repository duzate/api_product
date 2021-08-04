const User = require('../models/User');

class UserController {
  async store(req, res) {
    const {
      id,
      name,
      email,
      cpf,
      filename: avatar,
    } = await User.create(req.body, req.file);
    return res.json({
      id,
      name,
      email,
      cpf,
      avatar,
    });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ where: { email } });
      if (emailExists) {
        return res.status(400).json({ error: 'Email already exists.' });
      }
    }

    if (oldPassword && !(await User.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = await user.update(req.body, req.file);
    const { filename: avatar } = req.file;
    return res.json({
      id,
      name,
      email,
      avatar,
    });
  }
}
module.exports = new UserController();
