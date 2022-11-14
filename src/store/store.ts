import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core'
import graphNodesReducer from '../reducers/graph-nodes.reducer';
import rootSaga from '../sagas/root.saga';

const makeStore = () => {
    const sagaMiddleware = createSagaMiddleware()
    const store = configureStore({
        reducer: {
            graphNodes: graphNodesReducer,
        },
        middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: false })
            .prepend(sagaMiddleware)
    });
    sagaMiddleware.run(rootSaga)

    return store
}
export const store = makeStore()

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
