export interface IStackNavigationProperties {
    navigation: {
        addListener: Function,
        canGoBack: Function,
        closeDrawer: Function,
        dangerouslyGetParent: Function,
        dangerouslyGetState: Function,
        dispatch: Function,
        goBack: Function,
        isFocused: Function,
        jumpTo: Function,
        navigate: Function,
        openDrawer: Function,
        pop: Function,
        popToTop: Function,
        push: Function,
        removeListener: Function,
        replace: Function,
        reset: Function,
        setOptions: Function,
        setParams: Function,
        toggleDrawer: Function,
    };
    route: {
        key: string,
        name: string,
        params: any,
    };
}
