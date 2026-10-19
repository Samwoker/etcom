import { useNavigate } from 'react-router-dom';
import { useDemoStore } from '@/store/demoStore';
import { ROUTES } from '@/app/routes';
import type { Role } from '@/types';

export function useWelcome() {
  const navigate = useNavigate();
  const setRole = useDemoStore((state) => state.setRole);

  const selectRole = (role: Role) => {
    setRole(role);
    navigate(ROUTES.AUTH_SIGNUP);
  };

  const goToLogin = () => {
    navigate(ROUTES.AUTH_VERIFY_PHONE);
  };

  return {
    selectRole,
    goToLogin,
  };
}
