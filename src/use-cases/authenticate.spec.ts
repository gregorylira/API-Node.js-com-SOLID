import { expect, describe, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InMemoryUsersRepository } from '@/repositores/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', ()=>{
    it('should be able to authenticate', async ()=>{
        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepository)

        await usersRepository.create({
            name: 'any_name',
            email: 'any_email@any.com',
            password_hash: await hash('any_password', 6)
        })

        const {user} = await sut.execute({
            email: 'any_email@any.com',
            password: 'any_password'
        })

        expect(user.id).toEqual(expect.any(String))

    })

    it('should be able to authenticate with wrong email', async ()=>{
        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepository)

        await expect(()=>sut.execute({
            email: 'any@any.com',
            password: 'any_password'
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should be able to authenticate with wrong password', async ()=>{
        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepository)

        await usersRepository.create({
            name: 'any_name',
            email: 'any_email@any.com',
            password_hash: await hash('any_password', 6)
        })

        await expect(()=>sut.execute({
            email: 'any_email@any.com',
            password: 'wrong_password'
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})