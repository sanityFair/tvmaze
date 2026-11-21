import { SignInIcon } from '@phosphor-icons/react';

import { Button } from '~/ui-kit/button';
import { Input } from '~/ui-kit/input';
import { Spinner } from '~/ui-kit/spinner';

import { useLoginPage } from './logic/use-login-page';

export const LoginPage = () => {
  const login = useLoginPage();

  return (
    <section
      aria-labelledby="login-title"
      className="flex min-h-dvh animate-fade flex-col justify-center gap-10 px-4 py-16 sm:px-8"
    >
      <div className="flex flex-col gap-3">
        <h1
          id="login-title"
          className="w-fit animate-rgb-drift font-heading text-5xl font-bold tracking-wide text-white rgb-split motion-reduce:animate-none"
        >
          TVMaze
        </h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          Sign in with your email to keep your own shelf of favorite shows. No password needed.
        </p>
      </div>

      <form noValidate onSubmit={login.onSubmit} className="flex max-w-sm flex-col gap-3">
        <label
          htmlFor="login-email"
          className="text-xs tracking-wider text-muted-foreground uppercase"
        >
          Email
        </label>
        <Input
          id="login-email"
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          required
          value={login.email}
          onChange={login.onEmailChange}
          aria-invalid={login.errorMessage !== null}
          aria-describedby={login.errorMessage ? 'login-error' : undefined}
          className="h-10"
        />
        {login.errorMessage && (
          <p id="login-error" role="alert" className="text-xs text-destructive">
            {login.errorMessage}
          </p>
        )}
        <Button type="submit" size="lg" disabled={login.isSubmitting} className="h-10 gap-2">
          {login.isSubmitting ? <Spinner aria-hidden /> : <SignInIcon aria-hidden />}
          Sign in
        </Button>
      </form>
    </section>
  );
};
