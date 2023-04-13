import { createTheme } from "@mui/material";
import { blue, red, grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: blue[800]
    },
    secondary: {
      main: blue[700]
    },
    error: {
      main: red[500]
    },
    text: {
      primary: grey[700],
      secondary: grey[800],
      disabled: grey[800],
      hint: grey[800]
    }
  }
});
export default theme;
