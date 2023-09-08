import { makeStyles, Breadcrumbs } from "@material-ui/core";
import { styled } from '@mui/material/styles';


export const useStyles = makeStyles((theme) => ({

    container: {
    margin: '0rem 2rem ! important',
    color:'black ! important'
    },
    itemsDirection:{
     display: "flex", 
     alignItems: 'center', 
     justifyContent: 'center' 
    },
    icon: {
        color: " #3a67d9",
        display: 'flex',
        justifyContent: 'flext-start',
        marginTop: '1rem',
        marginBottom: '1rem'
    },
    cards: {
        backgroundColor: '#e9eefc'
    },
    breadcrumbStyle: {
        height: '150px',
        width: '150px',
        borderRadius: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#ccc',

    },
    linkStyle: {
        textDecoration: 'none', // Remove text decoration
        color: 'inherit', // Inherit the color
    },
    cardtitles: {
        display: 'flex',
        flexDirection: 'row',
        borderBottom: '5px',
        color:'black ! important'
    },
    names: {
        display: 'flex',
        flexDirection: 'row',
        padding: '8px',

    },
    typegrophy: {
        margin: '0 3rem !important',
        fontSize: '0.77rem !important',
        fontWeight: 'bold'
       
    },
    cirle: { display: 'flex',
     flexDirection: 'row', 
     paddingBottom: '2px' 
    },
    iconsize: {
        color: '#3f70ed',
        fontSize: '40px !important'
    },
    cameraicon: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '3px'
    },

    secondgrid: {
        margin: '10px 2px'
    },
    po: {
        display: 'flex',
        flexDirection: 'row',

    },
    buttonTitle: {
        color: 'black',
        textTransform: 'capitalize',
        display: 'flex',
        flexDirection: 'row',
    },
    buttonSubtitle: {
        marginTop: theme.spacing(1),
    },
    empty: {
        paddingTop: '7.5rem'
    },
     critical : {
        borderRadius: '15% !important',
        width: '120px !important',
        height: '80px !important',
        backgroundColor: 'white !important',
        boxShadow: '0px 4px 4px rgba(255, 0, 0, 1) !important',
        color:'black !important',
        margin: '0 1rem !important'
      },
      
       high : {
        borderRadius: '15% !important',
        width: '120px !important',
        height: '80px !important',
        backgroundColor: 'white !important',
        boxShadow: '0px 4px 4px rgb(255,69,0.4) !important',
        color: 'black !important',
        margin: '0 1rem !important'
       
      },
      
       green : {
        borderRadius: '15% !important',
        width: '120px !important',
        height: '80px !important',
        backgroundColor: 'white !important',
        boxShadow: '0px 4px 4px rgb(0,255,0.5) !important ',
        color: 'black !important',
        margin: '0 1rem !important'
      },
      
       purchase : {
        borderRadius: '15% !important',
        width: '190px !important',
        height: '80px !important',
        backgroundColor: 'white !important',
        color: 'black !important'
      
      },
      divdirection:{
     display: 'flex', 
     flexDirection: 'column' 
      },
      link:{ textDecoration: "none" 
    },
    countPosition:{
     textAlign: 'center' 
    }
      
}))

export const CustomBreadcrumb = styled(Breadcrumbs)(() => ({
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#ccc',

        '& a': {
        textDecoration: 'none',
        color: 'inherit',
    },
}));


