import { useEffect, useState } from 'react';
import { useBillsContext } from '../hooks/useBillsContext';
import { useAuthContext } from '../hooks/useAuthContext';

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
  const [ gridApi, setGridApi ] = useState(null);
  const { user } = useAuthContext();
  
  const year = "2023";

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const [res, data] = await getBills(user.token, year);
        if (!res.ok) {
          throw new Error(data.error);
        }
        dispatch({ type: "SET_BILLS", payload: data });
      } catch (error) {
        console.log(error);
      }
    };
    
    if (user) {
      fetchBills();
    }
  }, [dispatch, year, user]);

  const handleDeleteSelected = async () => {
    const selectedNodes = gridApi.getSelectedNodes();
    const selectedIds = selectedNodes.map((node) => node.data._id);

    for (const id of selectedIds) {
      try {
        const [res, data] = await deleteBill(user.token, year, id);
        if (!res.ok) {
          throw new Error(data.error);
        }
        dispatch({ type: "DELETE_BILL", payload: id });
      } catch (error) {
        console.log(error);
      }
    }

    gridApi.deselectAll();
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
          paginationPageSize={25}
          paginationPageSizeSelector={[25, 50, 100]}
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
