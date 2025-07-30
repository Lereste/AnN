export interface WrapperConfig {
    remoteName: string;
    exposedModule: string;
    elementName: string;
    remoteEntry: string;
}

export const initWrapperConfig: WrapperConfig = {
    remoteName: '',
    exposedModule: '',
    elementName: '',
    remoteEntry: ''
}
