export type commonModelType = {
  isDeleted?: boolean;
  timestamps?: Date;
};

export type userModelType<T = Record<string, any>> = T & {
  name: string;
  email: string;
  password: string;
  token: string;
  comparePasswords?(userPassword: string): boolean;
};
