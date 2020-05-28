import React, { useEffect, useState } from 'react';
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableHeader,
  TableCell,
} from 'carbon-components-react';

function getHeaders(item: object = {}) {
  const capitalize = (name) => name.charAt(0).toUpperCase() + name.slice(1);
  return Object.keys(item)
    .filter((item) => item !== 'id')
    .map((key) => ({
      header: capitalize(key),
      key: key,
    }));
}

function getImages(data: object) {
  const imgs: Array<any> = [];
  let counter: number = 0;
  Object.entries(data).forEach(([releaseKey, release]: [string, object]) => {
    Object.entries(release).forEach(
      ([componentKey, component]: [string, object]) => {
        const set_of_images: [] = component['images'];
        set_of_images.forEach((image: object) => {
          // @ts-ignore
          imgs.push({ id: `${counter}`, ...image });
          counter++;
        });
      }
    );
  });
  console.log(imgs);
  return imgs;
}
const fetchAPI = async (setter: Function, api: string) => {
  try {
    const response = await fetch(api);
    const result: object = await response.json();
    setter(getImages(result));
  } catch (e) {
    setter({ error: `${e}` });
  }
};
export default function () {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  useEffect(() => {
    fetchAPI(setData, 'http://192.168.99.100:8000/');
  }, []);
  useEffect(() => {
    //@ts-ignore
    setHeaders(getHeaders(data[0]));
  }, [data]);
  return (
    <div>
      <DataTable
        rows={data}
        headers={headers}
        render={({ rows, headers, getHeaderProps }) => (
          <TableContainer title="DataTable">
            <Table>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader {...getHeaderProps({ header })}>
                      {
                        //@ts-ignore
                        header.header
                      }
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => {
                  return (
                    // @ts-ignore
                    <TableRow key={row.id}>
                      {
                        // @ts-ignore
                        row.cells.map((cell) => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))
                      }
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      />
    </div>
  );
}
