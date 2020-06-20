export const setDbReady = (dbReady: boolean) => ({
    type: 'SET_DB_READY',
    dbReady,
});

export const dbReady = (state = false, action: any): boolean => {
    switch (action.type) {
        case 'SET_DB_READY':
            return action.dbReady;
        default:
            return state;
    }
};

export interface IDbReadyProperty {
    dbReady: boolean;
}
