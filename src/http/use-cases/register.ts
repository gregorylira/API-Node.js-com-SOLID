import { UsersRepository } from '@/repositores/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists'

interface RegisterUserCaseProps {
  name: string
  email: string
  password: string
}

export class RegisterUserCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUserCaseProps) {

    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError()
    }

    const password_hash = await hash(password, 8)

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
