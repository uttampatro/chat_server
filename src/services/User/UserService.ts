import { User } from '../../entity/User';
import { SaveUserDTO } from './UserDTO';

class UserService {
    async saveUser(dto: SaveUserDTO) {
        const { githubId, email } = dto;
        const user = new User();
        user.email = email;
        user.githubId = githubId;
        return await user.save();
    }
    async findUsers() {
        const conversation = await User.find({
            relations: ['messages'],
        });
        return conversation;
    }
}

export default new UserService();
