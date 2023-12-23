import { useEffect, useState } from "react";
import { useBillsContext } from "../hooks/useBillsContext";
import { useAuthContext } from "../hooks/useAuthContext";

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
  const [ gridApi, setGridApi ] = useState(null);
  const { user } = useAuthContext();

  const year = "2023";

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const [res, data] = await getBillsByCategory(user.token, year, category);
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
  }, [dispatch, category, year, user]);

  const handleDeleteSelected = async () => {
    const selectedNodes = gridApi.getSelectedNodes();
    const selectedIds = selectedNodes.map((node) => node.data._id);

    for (let id of selectedIds) {
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
