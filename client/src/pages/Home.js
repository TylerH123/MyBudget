import { useEffect, useState } from 'react';
import { useBillsContext } from '../hooks/useBillsContext';

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // For structural styles
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme

// components
import AddBillForm from "../components/AddBillForm";
import CSVParser from "../components/CSVParser";

// utils
import { getBills, deleteBill } from "../utils/apiUtils";
import { displayDate, displayBillAmount } from "../utils/utils";

const Home = () => {
  const { bills, dispatch } = useBillsContext();
  const year = "2023";
  const [gridApi, setGridApi] = useState(null);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const [res, data] = await getBills(year);
        if (!res.ok) {
          throw new Error(data.error);
        }
        dispatch({ type: "SET_BILLS", payload: data });
      } catch (error) {
        console.log(error);
      }
    };
    fetchBills();
  }, [dispatch, year]);

  const handleDeleteSelected = async () => {
    const selectedNodes = gridApi.getSelectedNodes();
    const selectedIds = selectedNodes.map((node) => node.data._id);

    for (const id of selectedIds) {
      try {
        const [res] = await deleteBill(year, id);
        if (!res.ok) {
          console.log(res);
          throw new Error(res.error);
        }
        dispatch({ type: "DELETE_BILL", payload: id });
      } catch (error) {
        console.log(error);
      }
    }

    gridApi.deselectAll();
    const [res, updatedData] = await getBills(year);
    if (res.ok) {
      dispatch({ type: "SET_BILLS", payload: updatedData });
    }
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const columns = [
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
      sortable: false,
      width: 50,
      lockPosition: true,
      resizable: false,
      suppressMenu: true,
      flex: 0,
    },
    {
      headerName: "Date",
      field: "date",
      sortable: true,
      filter: true,
      valueFormatter: (params) => displayDate(params.value),
      flex: 1,
    },
    {
      headerName: "Category",
      field: "category",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "Subcategory",
      field: "subcategory",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "Amount",
      field: "amount",
      sortable: true,
      filter: true,
      valueFormatter: (params) => displayBillAmount(params.value),
      flex: 1,
    },
  ];

  if (!bills) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home">
      <button onClick={handleDeleteSelected} className="delete-button">
        Delete Selected
      </button>
      <div id="myGrid" className="ag-theme-quartz">
        <AgGridReact
          rowData={bills}
          columnDefs={columns}
          domLayout="autoHeight"
          pagination={true}
          paginationPageSize={20}
          rowSelection="multiple"
          onGridReady={onGridReady}
          suppressRowClickSelection
          suppressCellSelection
        />
      </div>
      <AddBillForm category={"Food"} />
      <CSVParser />
    </div>
  );
};

export default Home;
