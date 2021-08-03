const User = require('../models/User');

class UserController {
  async store(req, res) {
    const { id, name, email, cpf, avatar } = await User.create(req.body);

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

    if (email !== user.email) {
      const emailExists = await User.findOne({ where: { email } });
      if (emailExists) {
        return res.status(400).json({ error: 'Email already exists.' });
      }
    }

    if (oldPassword && !(await User.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, avatar } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      avatar,
    });
  }
}
module.exports = new UserController();
