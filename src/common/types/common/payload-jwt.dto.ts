import { Role, Users, UserStatus } from '@prisma/client';

export class PayloadJwtDto {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  status: UserStatus;
  iat?: number;
  exp?: number;

  constructor(user: Users) {
    Object.assign(this, {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      status: user.status,
    });
  }
  toPlain(): PayloadJwtDto {
    const plainObj = Object.assign({}, this);
    delete plainObj.iat;
    delete plainObj.exp;
    return plainObj;
  }
}
