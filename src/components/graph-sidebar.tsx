import { Node } from '@reactflow/core/dist/esm/types/nodes';
import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { GraphSidebarProps } from '../models/model';
import '../styles/graph-sidebar.style.scss';


const GraphSidebar = ({ graphNodes, selectedId, setSelectedId }: GraphSidebarProps): any => {

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        id: string,
    ) => {
        setSelectedId(id);
    };

    return graphNodes?.length && (
        <Box className="graph-sidebar">
            <List component="nav">
                {graphNodes?.map((node: Node) => (<ListItemButton
                    key={'listItem' + node.id + Math.random()}
                    selected={selectedId === node.id}
                    onClick={(event) => handleListItemClick(event, node?.id)}
                >
                    <ListItemText primary={node?.data?.label}/>
                </ListItemButton>))}
            </List>
        </Box>
    );
}

export default GraphSidebar;