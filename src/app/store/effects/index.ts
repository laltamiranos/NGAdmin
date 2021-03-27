import { loginEffects } from './login.effects';
import { authEffects } from './auth.effects';
import { usersEffects } from './users.effects';

export const effectsArray: any[] = [
    loginEffects,
    authEffects,
    usersEffects,
];

export * from './login.effects';
export * from './auth.effects';
export * from './users.effects';