export type RootStackParamList = {
    Feed: undefined;
    Recipes: undefined;
    DietPlan: undefined;
    Explore: undefined;
    SignIn: undefined;
    Favourite: undefined;
    Profile:undefined;
    TwoFactorCode: TwoFactorType,
    TwoFactorRecoveryCode: TwoFactorType | undefined,
    SignUp: undefined;
    BottomNavigation: undefined;
    NotFound: undefined;
};

export interface TwoFactorType {
    email: string,
    password: string,
    rememberMe: boolean

}
