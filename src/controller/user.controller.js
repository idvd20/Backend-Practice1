const User = require("../model/user.model");

const registerUser = async (req, res) => {
	try {
		let userToCreate = new User({
			firstName: req.body.firstName,
			middleName: req.body.middleName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: req.body.password,
		});

		await userToCreate.save();

		return res.send(userToCreate);
	} catch (error) {
		console.log(error);
		return res.status(500).send(`Server error: ${error}`);
	}
};

const showUsers = async (req, res) => {
	try {
		const users = await User.find();

		return res.send(users);
	} catch (error) {
		console.log(error);
		return res.status(500).send(`Server error: ${error}`);
	}
};

const findUser = async (req, res) => {
	try {
		const userID = req.params.id;

		const user = await User.findById(userID);

		return res.send(user);
	} catch (error) {
		console.log(error);
		return res.status(500).send(`Server error: ${error}`);
	}
};

const updateUser = async (req, res) => {
	try {
		let userID = req.params.id;
		let userUpdate = req.body;

		await User.findByIdAndUpdate({ _id: userID }, { $set: userUpdate });

		return res.send(userUpdate);
	} catch (error) {
		console.log(error);
		return res.status(500).send(`Server error: ${error}`);
	}
};

const deleteUser = async (req, res) => {
	try {
		let userID = req.params.id;

		await User.findByIdAndDelete(userID);

		return res.send(userID);
	} catch (error) {
		console.log(error);
		return res.status(500).send(`Server error: ${error}`);
	}
};

module.exports = {
	registerUser,
	showUsers,
	findUser,
	updateUser,
	deleteUser,
};
