export interface IDrawerNavigationProperties {
    navigation: {
        addListener: Function;
        canGoBack: Function;
        closeDrawer: Function;
        dangerouslyGetParent: Function;
        dangerouslyGetState: Function;
        dispatch: Function;
        goBack: Function;
        isFocused: Function;
        jumpTo: Function;
        navigate: Function;
        openDrawer: Function;
        removeListener: Function;
        reset: Function;
        setOptions: Function;
        setParams: Function;
        toggleDrawer: Function;
    };
    route: {
        key: string;
        name: string;
        params: any;
    };
}
