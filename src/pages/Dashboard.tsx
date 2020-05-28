import React, { useEffect, useState } from 'react';
import {
  Dropdown,
  DataTable,
  TableContainer,
  TableToolbar,
  TableBatchAction,
  TableBatchActions,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarMenu,
  TableToolbarAction,
  Table,
  TableHead,
  TableRow,
  TableSelectAll,
  TableSelectRow,
  TableBody,
  TableHeader,
  TableCell,
} from 'carbon-components-react';

import {
  Delete16 as Delete,
  Download16 as Download,
  Save16 as Save,
} from '@carbon/icons-react';

const fetchAPI = async (setter: Function, api: string) => {
  try {
    const response = await fetch(api);
    const result: object = await response.json();
    setter(result);
  } catch (e) {
    setter({ error: e });
  }
};
export default function () {
  const [data, setData] = useState({});

  useEffect(() => {
    fetchAPI(setData, 'http://192.168.99.100:8000/');
  }, []);
  // useEffect(() => {
  //   setItems(
  //     // @ts-ignore
  //     Object.keys(data).map((key) => ({
  //       text: key,
  //       id: key,
  //     }))
  //   );
  // }, [data]);
  return (
    <div>
      <DataTable
        rows={[]}
        headers={[]}
        render={({
          rows,
          headers,
          getHeaderProps,
          getRowProps,
          getSelectionProps,
          getBatchActionProps,
          onInputChange,
          selectedRows,
        }) => (
          <TableContainer title="DataTable with batch actions">
            <TableToolbar>
              <TableBatchActions {...getBatchActionProps()}>
                <TableBatchAction
                  tabIndex={
                    getBatchActionProps().shouldShowBatchActions ? 0 : -1
                  }
                  renderIcon={Delete}
                  onClick={() => console.log('clicked')}
                >
                  Delete
                </TableBatchAction>
                <TableBatchAction
                  tabIndex={
                    getBatchActionProps().shouldShowBatchActions ? 0 : -1
                  }
                  renderIcon={Save}
                  onClick={() => console.log('clicked')}
                >
                  Save
                </TableBatchAction>
                <TableBatchAction
                  tabIndex={
                    getBatchActionProps().shouldShowBatchActions ? 0 : -1
                  }
                  renderIcon={Download}
                  onClick={() => console.log('clicked')}
                >
                  Download
                </TableBatchAction>
              </TableBatchActions>
              <TableToolbarContent>
                <TableToolbarSearch
                  tabIndex={
                    getBatchActionProps().shouldShowBatchActions ? -1 : 0
                  }
                  onChange={onInputChange}
                />
                <TableToolbarMenu
                  tabIndex={
                    getBatchActionProps().shouldShowBatchActions ? -1 : 0
                  }
                >
                  <TableToolbarAction
                    primaryFocus
                    onClick={() => alert('Alert 1')}
                  >
                    Action 1
                  </TableToolbarAction>
                  <TableToolbarAction onClick={() => alert('Alert 2')}>
                    Action 2
                  </TableToolbarAction>
                  <TableToolbarAction onClick={() => alert('Alert 3')}>
                    Action 3
                  </TableToolbarAction>
                </TableToolbarMenu>
              </TableToolbarContent>
            </TableToolbar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableSelectAll {...getSelectionProps()} />
                  {headers.map((header) => (
                    <TableHeader {...getHeaderProps({ header })}>
                      {
                        // @ts-ignore
                        header.header
                      }
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow {...getRowProps({ row })}>
                    <TableSelectRow {...getSelectionProps({ row })} />
                    {
                      // @ts-ignore
                      row.cells.map((cell) => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))
                    }
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      />
    </div>
  );
}
