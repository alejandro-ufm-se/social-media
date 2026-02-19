import { UserRepository } from '../../repositories/user-repository.js';
import { UserService } from '../../services/user-service.js';

describe('UserService', () => {
  it('should return a new User', async () => {
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);

    const result = await userService.createUserAsync({
        email : "joseguzman@gmail.com",
        password : "encrypted1234",
        name : "Jose",
    });

    // el password debe de estar encriptado
    expect(result.password).toEqual("encrypted1234");

    // el id tiene que ser mayor a 0
    expect(result.id).toBeGreaterThan(0);

    // el array de amigos tiene que estar vacio
    expect(result.friends.length).toBe(0);
  });
});
