import React from 'react';
import './App.css';
import { createMuiTheme, MuiThemeProvider, Box, makeStyles, AppBar, Toolbar, IconButton, Typography, Button, Menu } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';

const customTheme = createMuiTheme({
  palette: {
    action: {
      activatedOpacity: 0.24,
      active: "#fff",
      disabled: "rgba(255, 255, 255, 0.3)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(255, 255, 255, 0.12)",
      focusOpacity: 0.12,
      hover: "rgba(255, 255, 255, 0.08)",
      hoverOpacity: 0.08,
      selected: "rgba(255, 255, 255, 0.16)",
      selectedOpacity: 0.16,
    },
    primary: {
      contrastText: "rgba(0, 0, 0, 0.87)",
      dark: "rgb(100, 141, 174)",
      light: "rgb(166, 212, 250)",
      main: orange[500]
    },
    secondary: {
      contrastText: "rgba(0, 0, 0, 0.87)",
      dark: "rgb(170, 100, 123)",
      light: "rgb(246, 165, 192)",
      main: "#0A0A0A"
    },
    text:{
      disabled: "rgba(255, 255, 255, 0.5)",
      hint: "rgba(255, 255, 255, 0.5)",
      primary: "#fff",
      secondary: "rgba(255, 255, 255, 0.7)"
    },
    background: {
      default: "#121212",
      paper: "#424242"
    },
  },
  overrides: {
    MuiInput: {
      underline: {
        "&&&&:before": {
          borderBottom: "1px solid rgba(255, 255, 255, 0.7)"
        }
      }
    },
    MuiOutlinedInput: {
      notchedOutline: {
        borderColor: '#777'
      },
    },
    MuiTableCell: {
      root: {
        borderBottomColor: "#333"
      }
    }
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#222',
    backgroundSize: '100%',
  },
  title: {
    flexGrow: 1,
  },
  content: { }
}));

function App() {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={customTheme}>
      <div className={classes.root}>
        <Box height="100%" className={classes.root}>
          <AppBar color="secondary" position="static">
            <Toolbar>
              <Typography color="textPrimary" variant="h6" className={classes.title}>
                Encoder Decoder - Teoria da Informação
              </Typography>
            </Toolbar>
          </AppBar>
          <Box color="primary" height="100%" className={classes.content}>
            {/* <Route exact path="/" title="Teste" component={Home}/> */}
            
          </Box>
        </Box>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
