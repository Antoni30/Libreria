import { UserRole } from '../enums/user.enum'
import { User, UserRegistration } from '../types/user'

async function signInSimulated(
  email: string,
  password: string
): Promise<User | undefined> {
  return new Promise((resolve) => {
    const roleFromEmail: Record<string, UserRole> = {
      'admin@gmail.com': UserRole.ADMIN,
      'librarian@gmail.com': UserRole.LIBRARIAN,
      'client@gmail.com': UserRole.CLIENT,
    }

    setTimeout(() => {
      if (!password || !Object.keys(roleFromEmail).includes(email)) {
        return resolve(undefined)
      }

      resolve({
        email: email,
        fullname: 'John Doe',
        id: 1,
        phoneNumber: '0985635691',
        role: roleFromEmail[email],
      })
    }, 2000)
  })
}

export async function signInService(email: string, password: string) {
  const userSignIn = await signInSimulated(email, password)
  return userSignIn
}

async function signUpSimulated(
  user: UserRegistration
): Promise<User | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (user.fullname !== 'jane doe') {
        resolve(undefined)
      }

      resolve({
        ...user,
        id: 2,
      })
    }, 2000)
  })
}

export async function signUpService(user: UserRegistration) {
  const userCreated = await signUpSimulated(user)
  return userCreated !== undefined
}
