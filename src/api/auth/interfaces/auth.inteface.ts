export interface payloadInterface {
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly username: string;
  readonly lastRoleId: number;
  readonly roleId: number;
  readonly roleName: string;
  readonly networkId: number;
  readonly networkName: string; 
  // readonly authorizedFunctions: Array<string>;
}

export interface tokensInterface {
  readonly accessToken: string;
  readonly refreshToken: string;
  userId: number;
  firstName: string;
  lastName: string;
  username: string;
  roleId: number;
  roleName: string;
  // hasStoreRequest: boolean;
}

export interface otpRegisterResponse {
  readonly cellphone: string;
  readonly roleId: number;
  readonly message: string;
}
