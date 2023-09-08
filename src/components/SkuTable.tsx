import React, { useState, useEffect } from 'react';
import { Box, InputAdornment, Paper, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ReusableTable from '../controls/Table'; // Path to your ReusableTable component
import AddIcon from '@mui/icons-material/Add';
import CustomButton from '../controls/Button';
import { useNavigate } from 'react-router-dom';


interface Data {
  id: number;
  barcode: number;
  name: string;
  category: string;
  description: string;
  minstock: number;
  maxstock: number;
  availablestock: number;
}

const headCells = [
  { id: 'skuid', label: 'SKU ID' },
  { id: 'barcode', label: 'Barcode' },
  { id: 'name', label: 'Name' },
  { id: 'category', label: 'Category' },
  { id: 'description', label: 'Description' },
  { id: 'minstock', label: 'Min Stock' },
  { id: 'maxstock', label: 'Max Stock' },
  { id: 'availablestock', label: 'Available Stock' },
  { id: 'useractions', label: '' },
];

const SkuTable: React.FC = () => {
  const [search, setSearch] = useState<string>("")
  const [dataCopy,setDataCopy]=useState<Data[]>([]);
  const [data, setData] = useState<Data[]>([]);
  const navigate = useNavigate()
 
  const handleSearch = (e: any) => {
    setSearch(e.target.value)
  }

useEffect(()=>{
const filterdata=dataCopy.filter((item)=>item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
setData(filterdata);
},[search])

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://rameshayyala.vercel.app/imprest_item');
      const jsonData = await response.json();
      console.log(jsonData,"jsondata")
  
      const outofstock = jsonData.filter((item:any) => eval(item.availablestock) < eval(item.minstock));
      const outcount = outofstock.length;
      
      console.log(outcount, "outofstock");
      const instock = jsonData.filter((item:any) => eval(item.availablestock) >= (eval(item.minstock)));
      const instockcount = instock.length;
      console.log(instockcount, "instockcount");
      const filteredByCondition2 = data.filter(item => (item.minstock < item.availablestock) && (item.availablestock <= (item.minstock + 7)));
      const thresholdcount = filteredByCondition2.length;
      console.log(thresholdcount,"thresholdcount")

      localStorage.setItem("instockcount", JSON.stringify(instockcount));
      localStorage.setItem("outcount", JSON.stringify(outcount));
      localStorage.setItem("thresholdcount", JSON.stringify(thresholdcount));


  setData(jsonData);
      setDataCopy(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleDelete = async (id: number) => {

    console.log(id, "id")
    try {
      // Make a DELETE request to the API to delete the item
      await fetch(`https://rameshayyala.vercel.app/imprest_item/${id}`, {
        method: 'DELETE',
      });

      // Update the data state by removing the deleted item
      setData((prevData) =>
        prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/stockupdate/${id}`)
  };

  return (
    <div className='subpage_content'>
       <div className='static_title'>
       
        <h2 className='page_main_title'><span><i className="fa fa-file-text" aria-hidden="true"></i></span>Stock</h2>
      </div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <CustomButton className='btn_general'
        variant="contained" 
        color="#6FB861" 
        startIcon={<AddIcon />} 
        onClick={() => navigate("/stockform")}>
          ADD
        </CustomButton>
        <TextField className='search_field'
          placeholder="Search"
          type="text"
          onChange={handleSearch}
          style={{ marginTop: '15px', padding: '3px' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" >
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Paper style={{ width: '100%', marginTop: '0px' }} className='data_table_global'>
        <ReusableTable
          columns={headCells}
          data={data}
          onDelete={handleDelete}
          onEdit={handleEdit} />
      </Paper>
    </div>
  );
};

export default SkuTable;
