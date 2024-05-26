import { hash } from 'bcryptjs'

interface RegisterUserCaseProps {
  name: string
  email: string
  password: string
}

export class RegisterUserCase {
  constructor(private usersRepository: any) {}

  async execute({ name, email, password }: RegisterUserCaseProps) {
    const password_hash = await hash(password, 8)

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
