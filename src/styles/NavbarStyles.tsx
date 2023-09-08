import { makeStyles } from '@material-ui/core';
import { styled, alpha } from '@mui/material/styles';
import { MenuProps, Menu } from "@mui/material"

export const useStyles = makeStyles(() => ({
  customAppBar: {
    justifyContent: 'space-between',
    backgroundColor: "#3f70ed",
  marginBottom:'5px ! important',
  marginTop:'0',
  borderBottomColor: "#fff",
  borderBottomStyle: 'solid',
  borderBottomWidth: '3px',
  minHeight: '70px',
 
 
  
    color: 'white ! important',
    
  },
  img: {
    height: '45px',
    width: '45px',
    paddingTop: '7px',
    marginLeft: '10px'
  },
  gridcontainer: {
    alignItems: "center", justifyContent: "flex-end",
  },
  title:{
    color:'white',
    fontSize:'20px !important',
    marginLeft:'15px',
    paddingLeft:'15px',
    whiteSpace: 'nowrap',
    fontWeight: 'bold'

    
  }

}));


export const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 0,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

 