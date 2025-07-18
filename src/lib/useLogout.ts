// hooks/useLogout.ts
import { useDispatch } from 'react-redux'
import { queryClient } from '@/app/provider'
import { logout as logoutAction } from '@/state/user'
import { useRouter } from 'next/navigation'

export const useLogout = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const logout = () => {
    // Clear Redux store
    dispatch(logoutAction())

    // Clear React Query cache
    queryClient.clear()

    // Optional: Redirect
    router.push('/auth')
  }

  return logout
}
