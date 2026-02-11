import { UserRepository } from '../../repositories/user-repository.js';
import { UserService } from '../../services/user-service.js';
import type { User } from '../../models/user.js';

describe('UserService', () => {
  it('should return a new User', async () => {
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);

    let user : User = {
        email : "joseguzman@gmail.com",
        password : "encrypted",
        name : "Jose",
        id : 100,
        role : 1,
        friends : []
    };
    const result = await userService.registerUserAsync(user);

    // el objeto debe de ser el mismo
    expect(result).toMatchObject(user);

    // el password debe de estar encriptado
    expect(result.password).toEqual("encrypted");

    // el id tiene que ser mayor a 0
    expect(result.id).toBeGreaterThan(0);

    // el array de amigos tiene que estar vacio
    expect(result.friends.length).toBe(0);
  });
});

