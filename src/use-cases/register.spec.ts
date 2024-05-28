import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositores/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists'

describe('Register Use Case', ()=>{
    it('should be able to register', async ()=>{
        const usersRepository = new InMemoryUsersRepository()
        const registerUser = new RegisterUseCase(usersRepository)

        const {user} = await registerUser.execute({
            name: 'any_name',
            email: 'any_email@any.com',
            password: 'any_password'
        })

        expect(user.id).toEqual(expect.any(String))
    })


    it('should register a new user', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUser = new RegisterUseCase(usersRepository)

        const {user} = await registerUser.execute({
            name: 'any_name',
            email: 'any_email@any.com',
            password: 'any_password'
        })

        const isPasswordCorrectlyHashed = await compare('any_password', user.password_hash)

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with same email twice', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const email = 'any_email@any.com'

        await registerUseCase.execute({
            name: 'any_name',
            email,
            password: 'any_password'
        })

        await expect(()=> registerUseCase.execute({
            name: 'any_name',
            email,
            password: 'any_password'
        })).rejects.toThrowError(new UserAlreadyExistsError())
    })

})