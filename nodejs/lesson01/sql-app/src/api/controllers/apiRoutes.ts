import { Router } from "express";
import { PermissionRepositoryImpl } from "../../infrastucture/repositories/permission.repository";
import { PermissionService } from "../../app/services/permission.service";
import { PermissionController } from "./PermissionController";
import { RolRepositoryImpl } from "../../infrastucture/repositories/rol.repository";
import { RolService } from "../../app/services/rol.service";
import { RolController } from "./RolController";
import { UserRepositoryImpl } from "../../infrastucture/repositories/user.reposity";
import { UserService } from "../../app/services/user.service";
import { UserController } from "./UserController";
import { EncryptImpl } from "../../infrastucture/utils/encrypt";
import { AuthService } from "../../app/services/auth.service";
import { AuthController } from "./authController";
import { RedisCacheService } from './../../infrastucture/cache/redis.cache';

const redisCacheService = new RedisCacheService();

const encrypt = new EncryptImpl();

const permissionRepository = new PermissionRepositoryImpl();
const permissionService = new PermissionService(permissionRepository);
const permissionController = new PermissionController(permissionService);

const rolRepository = new RolRepositoryImpl();
const rolService = new RolService(rolRepository);
const rolController = new RolController(rolService);

const userRepository = new UserRepositoryImpl();
const userService = new UserService(userRepository, rolRepository, redisCacheService);
const userController = new UserController(userService);

const authservice = new AuthService(userRepository, encrypt);
const authController = new AuthController(authservice);

const API:string = '/api';

export const routes = (server: any) => {

  server.use(`${API}/users`, userController.router);
  server.use(`${API}/roles`, rolController.router);
  server.use(`${API}/auth`, authController.router);
  server.use(`${API}/permissions`, permissionController.router);
}
