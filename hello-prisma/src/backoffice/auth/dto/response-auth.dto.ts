export class ResponseAuthDto {
  uId!: number;
  firstName!: string;
  userName!: string;
  password!: string;
  role!: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt!: Date | null;
}
// export function toAuthResponse(user){
//   uId:user.uId;
//   firstName:user.firstName;
//   userName:user.userName;
//   password:user.password;
//   role:user.role;
//   createdAt:user.createdAt;
//   updatedAt:user.updatedAt;
//   deletedAt:user.deletedAt;
// }

export function toAuthResponse(user: ResponseAuthDto): ResponseAuthDto {
  return {
    uId: user.uId,
    firstName: user.firstName,
    userName: user.userName,
    password: user.password,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    deletedAt: user.deletedAt,
  };
}
