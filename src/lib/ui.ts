import { AuthErrorCodes } from 'firebase/auth';
import toast from 'react-hot-toast';

export const showLoginError = (error: any) => {
  if (error.code === AuthErrorCodes.INVALID_PASSWORD) {
    toast.error("Wrong password. Try again.")
  } else if (error.code === 'auth/user-not-found') {
    toast.error("User not found")
  } else if (error.code == "auth/email-already-in-use") {
    toast.error("Email in user")
  } else {
    toast.error(`Error: ${error.message}`)
  }
}