/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { UserRole } from '../../users/enums/user.enum'
import { UserSignIn, UserSignUp } from '../types/auth'
import { auth, db } from './firebase.service'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'

/* async function signInSimulated(
  email: string,
  password: string
): Promise<UserSignIn | undefined> {
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
} */

/* async function signUpSimulated(user: UserSignUp): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(user.fullname === 'john doe')
    }, 2000)
  })
} */

export async function signInService(
  email: string,
  password: string
): Promise<UserSignIn | undefined> {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )

    const firebaseUser = userCredential.user

    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))

    if (!userDoc.exists()) {
      throw new Error("User doesn't exist")
    }

    const userSignIn = userDoc.data() as UserSignIn

    const response = await fetch(`http://localhost:2028/users/users_FB/${firebaseUser.uid}`);
    if (!response.ok) throw new Error("Failed to fetch user");
    const data = await response.json();
    console.log(data.id_user_role)
    userSignIn.role=data.id_user_role

    return userSignIn
  } catch (error) {
    console.error('Sign in error: ', error)
    return undefined
  }
}

export async function signUpService(user: UserSignUp): Promise<boolean> {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    )
    const roleCreate =  UserRole.CLIENT
    const firebaseUser = userCredential.user

    const userFirebaseData = {
      email: user.email,
      fullname: user.fullname,
      id: firebaseUser.uid,
      phoneNumber: user.phoneNumber,
      role: roleCreate,
    }

    await setDoc(doc(db, 'users', firebaseUser.uid), userFirebaseData)

    const apiResponse = await fetch('http://localhost:2028/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_user_role: roleCreate,
        user_fullname: user.fullname,
        user_email: user.email,
        user_password: user.password,
        user_phone: user.phoneNumber,
        id_firebase: firebaseUser.uid,
      }),
    })

    return apiResponse.ok
  } catch (error) {
    console.error('Sign up error: ', error)
    return false
  }
}
