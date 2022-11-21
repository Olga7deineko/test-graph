import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { GraphProps } from '../models/model';
import GraphHeader from './graph-header';
import GraphSidebar from '../containers/graph-sidebar.container';
import GraphBody from '../containers/graph-body.container';
import '../styles/index.scss';

export const Graph = ({ nodes, fetchGraphNodes }: GraphProps) => {

    useEffect(() => {
        fetchGraphNodes();
    }, []);

    return (
        <div id="root">
            <GraphHeader/>
            {nodes?.length ? <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <GraphSidebar/>
                    </Grid>
                    <Grid item xs={10}>
                        <GraphBody/>
                    </Grid>
                </Grid> :
                <div className="graph-loader-container">
                    <div className="graph-loader"></div>
                </div>}
        </div>
    );
}

export default Graph;
