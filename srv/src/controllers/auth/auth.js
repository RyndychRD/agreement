const getAuth = (req) => {
	return "AUTH";
};

/**
 * @description Производит авторизацию пользователя по логин-паролю
 * @param {{login:string, password:string}} req
 * @returns
 */
const createSession = (req) => {
	console.log(req.body);
	return { responst: "CREATE SESSION" };
};

module.exports = {
	getAuth,
	createSession,
};
