import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../../stores/UseAuthorStore.ts';

export default function CallbackPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { setToken } = useAuthStore();

  useEffect(() => {
    const token = params.get('token');
    const type = params.get('type');

    if (token) {
      setToken(token);
    }

    if (type === 'NEW_USER') {
      navigate('/onboarding/nickname', { replace: true });
    } else if (type === 'SUCCESS') {
      navigate('/home', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  }, [params, navigate, setToken]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-primary-bg text-gray-600">
      <div className="text-xl font-semibold">로그인 중입니다...</div>
      <div className="mt-2 text-sm text-gray-400">잠시만 기다려주세요</div>
    </div>
  );
}
