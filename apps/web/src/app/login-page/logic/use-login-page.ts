import { type ChangeEvent, type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';

import { HOME_PATH } from '~/app/logic/paths';
import { logIn } from '~/app/logic/tasks/log-in';

type LoginStatus = 'idle' | 'submitting' | 'invalid-email' | 'failed';

const ERROR_MESSAGES: Partial<Record<LoginStatus, string>> = {
  'invalid-email': 'Enter a valid email address.',
  failed: 'Couldn’t sign in. Make sure the API is running, then try again.',
};

/** After a successful sign-in the session gate redirects away from this page. */
export const useLoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<LoginStatus>('idle');
  const isSubmitting = status === 'submitting';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setStatus('submitting');
    const result = await logIn(email);
    if (result !== 'signed-in') setStatus(result);
  };

  return {
    email,
    isSubmitting,
    errorMessage: ERROR_MESSAGES[status] ?? null,
    onEmailChange: (event: ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
      if (status !== 'submitting') setStatus('idle');
    },
    onSubmit: (event: FormEvent<HTMLFormElement>) => void handleSubmit(event),
    onContinueAsGuest: () => void navigate(HOME_PATH),
  };
};
