import React from "react";

export abstract class NavigatorScreen extends React.Component {
    public navigation: any;
    public route: any;

    constructor(screenOptions: any) {
        super(screenOptions);
        console.log("screenOptions", screenOptions);
        this.navigation = screenOptions.navigation;
        this.route = screenOptions.route;
    }

    public navigate(screenName: string) {
        this.navigation.navigate(screenName);
    }

    public navigateBack() {
        this.navigation.goBack();
    }
}
