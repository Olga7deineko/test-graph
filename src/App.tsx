import { Grid } from '@mui/material';
import GraphHeader from './components/graph-header';
import GraphSidebar from './containers/graph-sidebar.container';
import GraphBody from './containers/graph-body.container';

function App() {
    return (
        <div id="root">
            <GraphHeader/>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <GraphSidebar/>
                </Grid>
                <Grid item xs={10}>
                    <GraphBody/>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
