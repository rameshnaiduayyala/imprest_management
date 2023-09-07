import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: any) => ({
  footer: {
    backgroundColor: '#E0FFFF',
    padding: theme.spacing(3),
    marginTop: 'auto', // Push the footer to the bottom
  },
  socialIcons: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));
