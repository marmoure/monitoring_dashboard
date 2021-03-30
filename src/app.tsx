import React, { useState } from 'react'
import DBState from './DBState';
import MemoryChart from './memoryChart'
import DiskSpace from './diskSpace'
import Grid from './grid';
import DBHealth from './DBHealth';
import "./style/index.scss";
import DBActions from './DBActions';
import { DBContext } from './DBConext';

const App = () => {
    const [monitor, setMonitor] = useState({pause:false,trace:false})
    return (
        <Grid>
            <DBContext.Provider value={{ monitor, setMonitor }}>
                <DBState gridArea="DBState" />
                <MemoryChart gridArea="memoryChart" />
                <DiskSpace gridArea="diskSpace" />
                <DBHealth gridArea="dbHealth"></DBHealth>
                <DBActions gridArea="dbActions" />
            </DBContext.Provider>
        </Grid>
    )
}

export default App
