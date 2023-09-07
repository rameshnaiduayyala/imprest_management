import { makeStyles, Breadcrumbs } from "@material-ui/core";
import { styled } from '@mui/material/styles';


export const useStyles = makeStyles((theme) => ({

    container: {

        margin: '0rem 3rem ! important'
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
        borderBottom: '5px'
    },
    names: {
        display: 'flex',
        flexDirection: 'row',
        padding: '8px',

    },
    typegrophy: {
        paddingRight: '7rem'
    },
    cirle: { display: 'flex', flexDirection: 'row', paddingBottom: '2px' },
    iconsize: {
        color: '#3f70ed',
        fontSize: '40px'
    },
    cameraicon: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '3px'
    },

secondgrid:{
    margin:'10px 2px'
},
po:{
    display:'flex',
    flexDirection:'row',

},
buttonTitle:{
    color:'black',
    textTransform: 'capitalize',
    display:'flex',
    flexDirection:'row',
},
buttonSubtitle: {
    marginTop: theme.spacing(1),
  },
  empty:{
    paddingTop:'7.5rem'
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


  