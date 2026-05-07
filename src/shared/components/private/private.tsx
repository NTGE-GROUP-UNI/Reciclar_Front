import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/shared/store/auth/auth.store'

export function PrivateRoute() {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

    if (!isAuthenticated) {
        return <Navigate to="/sign-in" replace />
    }

    return <Outlet />
}