import React from 'react';
import { App as AntdApp } from 'antd';
import DataTable from "@/src/components/DataTable";

const App = () => {
    return (
        <AntdApp>
            <DataTable />
        </AntdApp>
    );
}

export default App;