/**
 * @swagger
 * components:
 *   schemas:
 *     LoginCredentials:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 *       example:
 *         username: "usuario_ejemplo"
 *         password: "contraseña123"
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateByIdCredentials:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 *       example:
 *         username: "usuario_ejemplo"
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     CreateUser:
 *       type: object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               roleId:
 *                 type: string
 *       example:
 *         username: "usuario_ejemplo"
 *         email: "amy@san.com"
 *         password: "contraseña123"
 *         roleId: "1"
 */