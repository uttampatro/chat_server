import { User } from '../../entity/User';
import { LoginDTO } from './UserDTO';

class UserService {
    async login(dto: LoginDTO) {
        const { email, password } = dto;
        const user = await User.findOne({
            where: { email, password },
            select: ['id', 'email'],
        });
        return user;
    }
    async logout() {
        const conversation = await User.find({
            
        });
        return conversation;
    }
}

export default new UserService();
