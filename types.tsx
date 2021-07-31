export type RootStackParamList = {
    Home: undefined;
    SignIn: undefined;
    TwoFactorCode: TwoFactorType,
    TwoFactorRecoveryCode: TwoFactorType | undefined,
    SignUp: undefined;
    Profile: undefined;
    NotFound: undefined;
};

export interface TwoFactorType {
    email: string,
    password: string,
    rememberMe: boolean

}