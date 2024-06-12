import { red } from '@mui/material/colors';

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
        borderBottom: '1px solid #eee',
      },
      content: {
        margin: 0,
        alignItems: 'center',
        justifyContent: 'space-between',
        '&.Mui-expanded': {
          margin: 0,
          minHeight: 0,
        },
        '& .path-stack': {
          width: '70%',
          padding: '0 12px',
          borderRadius: '4px',
          fontSize: '14px',
          fontWeight: 600,
          flexDirection: 'row',
          alignItems: 'center',
          '& .MuiButtonGroup-root': {
            border: '1px solid #eaeaea',
            fontSize: '0.9rem',
            background: '#fff',
            '& > .MuiButton-root': {
              border: 'none',
            },
            '& > .MuiIconButton-root': {
              padding: '6px 8px',
              borderRight: '1px solid #eaeaea',
              borderRadius: '4px 0 0 4px',
            },
            '& > .MuiInputBase-root': {
              padding: '0 6px',
              '&:before': {
                display: 'none',
              },
            },
          },
        },
        '& .ctrl-stack': {
          flexDirection: 'row',
          marginRight: '16px',
        },
      },
    },
  },
};
