import type { Author } from '@types-interface/index';

export default interface Auth {
  user: Author | null;
  isAuthenticated: boolean;
  login: (user: Author) => void;
  logout: () => void;
}
