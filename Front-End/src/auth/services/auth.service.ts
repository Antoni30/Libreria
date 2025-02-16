import { UserRole } from '../../users/enums/user.enum'
import { User } from '../../users/types/user'
import { UserSignUp } from '../types/auth'
import { auth, db } from './firebase.service'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'

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
        id: '1',
        phoneNumber: '0985635691',
        role: roleFromEmail[email],
      })
    }, 2000)
  })
}

/* async function signUpSimulated(
  user: UserSignUp
): Promise<User | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (user.fullname !== 'jane doe') {
        resolve(undefined)
      }

      resolve({
        ...user,
        id: '2',
      })
    }, 2000)
  })
} */

export async function signInService(
  email: string,
  password: string
): Promise<User | undefined> {
  const userSimulated = await signInSimulated(email, password)
  if (userSimulated) return userSimulated

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )

    const firebaseUser = userCredential.user

    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))

    if (!userDoc.exists()) {
      throw new Error('El usuario no existe en Firestore')
    }

    const userData = userDoc.data() as User
    return userData
  } catch (error) {
    console.error('Error al iniciar sesión en Firebase o en la API:', error)
    return undefined
  }
}

export async function signUpService(
  user: UserSignUp
): Promise<User | undefined> {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    )
    const firebaseUser = userCredential.user

    const userData: User = {
      email: user.email,
      fullname: user.fullname,
      id: firebaseUser.uid,
      phoneNumber: user.phoneNumber,
      role: user.role,
    }

    await setDoc(doc(db, 'users', firebaseUser.uid), userData)

    const apiResponse = await fetch('http://localhost:2027/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_user_role: user.role,
        user_fullname: user.fullname,
        user_email: user.email,
        user_password: user.password,
        user_phone: user.phoneNumber,
        id_firebase: firebaseUser.uid,
      }),
    })

    if (!apiResponse.ok) {
      throw new Error('Error al guardar en la API externa')
    }

    return userData
  } catch (error) {
    console.error('Error al registrar en Firebase:', error)
    return undefined
  }
}
