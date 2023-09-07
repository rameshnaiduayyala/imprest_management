import {Grid,Box, Typography} from '@mui/material';
import ReusableTextField from '../controls/Texfiled';
import Dropdown from '../controls/ReusableDropdown';
import {useState} from "react";
import CustomButton from '../controls/Button';


 
const From = () => {

const [formData,setFormData]=useState({
skuid:'',
barcode:'',
name:'',
category:'',
description:'',
minstock:'',
maxstock:'',
availablestock:''
})
const categroynames = [
    { value: 'syrup', label: 'Syrup' },
    { value: 'vaccine', label: 'Vaccine' },
    { value: 'drug', label: 'Drug' },
    
  ];
const handleFieldChange = (fieldName:string, newValue:string|number) => {
    
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: newValue,
    }));
  };
  const handleSubmit = (e:any) => {
    e.preventDefault(); 

   
    console.log('Form Data:', formData);

 
    setFormData({
      skuid: '',
      barcode: '',
      name: '',
      category: '',
      description: '',
      minstock: '',
      maxstock: '',
      availablestock: '',
    });
  };

  

  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',  minHeight: '100vh'}}>


<Box style={{width:'500px',height:'300px',border:'2px solid black',padding:'30px'}} >
<Typography variant='h5' style={{textAlign:'center'}}>Add Items</Typography>
<form onSubmit={handleSubmit}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6} >
        <ReusableTextField
        name="skuid"
        type="number"
        label="skuid"
        value={formData.skuid}
        onChange={(newValue) => handleFieldChange('skuid', newValue)}
      
        
        />
        </Grid>
        <Grid item xs={6}>
        <ReusableTextField
        name="barcode"
        type="text"
        label="barcode"
        value={formData.barcode}
        onChange={(newValue) => handleFieldChange('barcode', newValue)}
       />
        </Grid>

      </Grid>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
        <ReusableTextField
        name="name"
        type="text"
        label="name"
        value={formData.name}
        onChange={(newValue) => handleFieldChange('name', newValue)}
      
        
        />
        </Grid>
        <Grid item xs={6}>
        <Dropdown
    options={categroynames}
    value={formData.category} 
    onChange={(newValue) => handleFieldChange('category', newValue)}
/>
        </Grid>

      </Grid>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
        <ReusableTextField
        name="description"
        type="text"
        label="description"
        value={formData.description}
        onChange={(newValue) => handleFieldChange('description', newValue)}
      
        
        />
        </Grid>
        <Grid item xs={6}>
        <ReusableTextField
        name="minstock"
        type="number"
        label="minstock"
        value={formData.minstock}
        onChange={(newValue) => handleFieldChange('minstock', newValue)}
       
        
        />
        </Grid>

      </Grid>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
        <ReusableTextField
        name="maxstock"
        type="number"
        label="maxstock"
        value={formData.maxstock}
        onChange={(newValue) => handleFieldChange('maxstock', newValue)}
      
        
        />
        </Grid>
        <Grid item xs={6}>
        <ReusableTextField
        name="availablestock"
        type="number"
        label="avaialbesctock"
        value={formData.availablestock}
        onChange={(newValue) => handleFieldChange('availablestock', newValue)}
       
        
        />
        </Grid>

      </Grid>

<div  style={{margin:'30px' ,display:'flex',alignItems:'flex-end',justifyContent:'flex-end'}}>
  <CustomButton color="blue" type="submit">Submit</CustomButton>
    <CustomButton color="red">Cancel</CustomButton>
</div>
</form>
    </Box>
</div>
  )
}

export default From