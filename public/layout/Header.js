import {
  Fragment as _Fragment,
  jsx as _jsx,
  jsxs as _jsxs,
} from 'react/jsx-runtime';
import { Stack, Button } from '@mui/material';
import ApiSearchBar from '~/components/SearchBar';
import DownlaodFile from '~/components/DownlaodFile';
import UploadFile from '~/components/UploadFile';
import useDialog from '~/hooks/useDialog';
var Header = function () {
  var openDialog = useDialog().openDialog;
  var onCreateApi = function () {
    openDialog({
      title: 'API 등록',
      content: _jsx(_Fragment, { children: '"test"' }),
      actions: [
        {
          text: '확인',
          variant: 'contained',
          onClick: function () {
            return console.log('확인');
          },
          closeAction: false,
        },
        {
          text: '취소',
          onClick: function () {
            return console.log('취소');
          },
        },
      ],
    });
  };
  return _jsxs(Stack, {
    component: 'header',
    flexDirection: 'row',
    justifyContent: 'space-between',
    sx: { py: 4 },
    children: [
      _jsx(ApiSearchBar, {}),
      _jsx(DownlaodFile, {
        url: 'http://localhost:8080/api/v1/download?name=/data/test',
      }),
      _jsx(UploadFile, {}),
      _jsx(Button, {
        variant: 'contained',
        onClick: onCreateApi,
        children: 'CREATE',
      }),
    ],
  });
};
export default Header;
