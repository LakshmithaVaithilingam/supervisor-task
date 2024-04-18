// material-ui
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Stack } from '@mui/material';
import GoogleButton from 'react-google-button';

//import { googleLoginRequest, googleLoginSuccess, googleLoginFailure } from 'store/actions/OauthActions';
//import { useDispatch } from 'react-redux';

// assets
//import Google from 'assets/images/icons/google.svg';

// ==============================|| FIREBASE - SOCIAL BUTTON ||============================== //

const FirebaseSocial = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  //const dispatch = useDispatch();

  // const googleHandler = (response) => {
  //   console.log(response);
  //   dispatch(googleLoginRequest(response.profileObj));
    
  //   if (response?.tokenId) {
  //     dispatch(googleLoginSuccess(response.profileObj));
  //   } else {
  //     dispatch(googleLoginFailure('Google login failed'));
  //   }
  // };

  return (
    <Stack
      direction="row"
      spacing={matchDownSM ? 1 : 2}
      justifyContent={matchDownSM ? 'space-around' : 'space-between'}
      sx={{ '& .MuiButton-startIcon': { mr: matchDownSM ? 0 : 1, ml: matchDownSM ? 0 : -0.5 } }}
    >
      <GoogleButton
                style={{ height: "50px", width: "100%" }}
              />
    </Stack>
  );
};

export default FirebaseSocial;