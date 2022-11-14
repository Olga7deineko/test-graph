import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface GraphNodesState {
    nodes: any[],
    edges: any[],
    selectedId: string | undefined
}

const initialState: GraphNodesState = {
    nodes: [],
    edges : [],
    selectedId: undefined
}

export const graphNodesSlice = createSlice({
    name: 'nodes',
    initialState,
    reducers: {
        fetchNodes: (state) => {},
        fetchNodesSucceeded: (state, action: PayloadAction<any>) => {
            state.nodes = action?.payload?.nodes;
            state.edges = action?.payload?.edges;
            state.selectedId = action?.payload?.nodes?.[0]?.id;
        },
        setSelectedId: (state, action: PayloadAction<string>) => {
            state.selectedId = action?.payload;
        }
    },
})

export const { fetchNodes, fetchNodesSucceeded, setSelectedId } = graphNodesSlice.actions

export default graphNodesSlice.reducer