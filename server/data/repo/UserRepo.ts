import {AppDataSource} from "../data-source";
import {User} from "../entity/User";

export class UserRepo {

    userRepo = AppDataSource.getRepository(User)

    add = (user) => {
        this.userRepo.create(user)
    }

}
