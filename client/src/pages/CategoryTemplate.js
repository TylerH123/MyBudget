import { useEffect, useState } from "react";
import { useBillsContext } from "../hooks/useBillsContext";

import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

// components
import AddBillForm from "../components/AddBillForm";

// utils
import { getBillsByCategory, deleteBill } from '../utils/apiUtils';
import { displayDate, displayBillAmount } from '../utils/utils';

const CategoryTemplate = (props) => {
  const { bills, dispatch } = useBillsContext();
  const { category } = props;
  const year = "2023";
  const [gridApi, setGridApi] = useState(null);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const [res, data] = await getBillsByCategory(year, category);
        if (!res.ok) {
          throw new Error(data.error);
        }
        dispatch({ type: "SET_BILLS", payload: data });
      } catch (error) {
        console.log(error);
      }
    };
    fetchBills();
  }, [dispatch, category, year]);

  const handleDeleteSelected = async () => {
    const selectedNodes = gridApi.getSelectedNodes();
    const selectedIds = selectedNodes.map((node) => node.data._id);

    for (let id of selectedIds) {
      try {
        const [res] = await deleteBill(year, id);
        if (!res.ok) {
          console.log(res);
        }
        dispatch({ type: "DELETE_BILL", payload: id });
      } catch (error) {
        console.log(error);
      }
    }

    gridApi.deselectAll();
    const [res, updatedData] = await getBillsByCategory(year, category);
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
      width: 50,
      lockPosition: true,
      suppressMenu: true,
      resizable: false,
      flex: 0,
    },
    {
      headerName: "Date",
      field: "date",
      sortable: true,
      filter: true,
      flex: 1,
      valueFormatter: (params) => displayDate(params.value),
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
      flex: 1,
      valueFormatter: (params) => displayBillAmount(params.value),
    },
  ];

  if (!bills) {
    return <div>Loading...</div>;
  }

  return (
    <div className="category-template">
      <button onClick={handleDeleteSelected} className="delete-button">
        Delete Selected
      </button>
      <div id="categoryGrid" className="ag-theme-quartz">
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
      <AddBillForm category={category} />
      {props.CSVParser}
    </div>
  );
};

export default CategoryTemplate;
