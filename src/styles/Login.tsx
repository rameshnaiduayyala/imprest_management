import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  login_form:{
    color:'blue',
  },

  validations:{
    display: 'flex',
    marginTop: '5px',
    justifyContent:'center',
    textAlign:'initial',
    color:'red',
    fontFamily:'sansarief',
  },
  forgotpass:{
    display: 'flex',
    flexDirection: 'column',
    alignItems:'center',
    marginLeft:'30%',
    cursor:'wait'
  },
  mmaindiv:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center'
  },
  login:{
    color:'	#36454F'
  },
  button:{
    width:'10rem !important',
    height:'1rem',
  
  },
  forgotlink:{
    display:'flex',
    justifyContent:'flex-end',
    textDecoration: 'none'
  }
}));



// .validations{
//   display: flex;
//   margin-top: 5px;
//   justify-content: center;
//    text-align: center;
//   color: red;
//   font-family: Georgia, 'Times New Roman', Times, serif ;
// }
// .forgotpass {
//   display: flex;
//   flex-direction: column;
//   color:blue;
//   align-items: center;
//   margin-top: 10%;
//   cursor:wait;
// }
// .forgotpassname{
//  color: blue;
//  display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-left: 30%;
//   cursor:wait;
// }
// .mmaindiv{
// display: flex;
// flex-direction: row;
// align-items: center;
// }