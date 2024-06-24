export default {
  MuiContainer: {
    styleOverrides: {
      root: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0 !important',
        height: '100%',
        '& #contents': {
          flexGrow: 1,
        },
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        border: '1px solid #ddd',
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        padding: '4px',
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        padding: '4px 8px',
        input: {
          padding: 0,
        },
      },
    },
  },
  // ApiBox
  MuiAccordionSummary: {
    styleOverrides: {
      root: {
        padding: 0,
        borderBottom: '1px solid #eee',
      },
      content: {
        margin: 0,
        justifyContent: 'space-between',
        '&.Mui-expanded': {
          margin: 0,
          minHeight: 0,
        },
      },
    },
  },
};
