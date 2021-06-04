import { User } from '../../entity/User';
import { SaveUserDTO } from './UserDTO';

class UserService {
    async login(dto: SaveUserDTO) {
        const { email, password } = dto;
        const user = await User.findOne({
            where: { email, password },
            select: ['id', 'email'],
        });
        return user;
    }
    async findUsers() {
        const conversation = await User.find({
            relations: ['messages'],
        });
        return conversation;
    }
}

export default new UserService();
