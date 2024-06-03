import React, {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  useState,
  useCallback,
  useImperativeHandle,
} from 'react';
import {
  Stack,
  FormGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
  Input,
  Checkbox,
} from '@mui/material';
import MapInput, { MapData } from '~/features/MapInput';
import Monaco from '~/features/Monaco';
import { deepClone, debounce } from '~/utils';
import useAlert from '~/hooks/useAlert';
import type { editor } from 'monaco-editor';
import type { ApiData } from '~/api';

export type EventRef = {
  resetFormData: () => void;
  getFormData: () => ApiData | void;
};

const defaultForm = {
  path: '',
  headers: [],
  methods: {},
  pipeline: {},
};

const Form = (_: null, ref: ForwardedRef<EventRef>) => {
  const [formData, setFormData] =
    useState<Omit<ApiData, 'response'>>(defaultForm);
  const [response, setResponse] = useState<string>('[]');
  const [markers, setMarkers] = useState<editor.IMarker[] | []>();
  const { openAlert } = useAlert();

  useImperativeHandle(
    ref,
    () => ({
      resetFormData: () => {
        setFormData(deepClone(defaultForm));
        setResponse('[]');
      },
      getFormData: () => {
        if (!markers?.length) {
          return { ...formData, response: JSON.parse(response) };
        }

        openAlert({
          type: 'error',
          message: markers
            .map(
              ({ endLineNumber, endColumn, message }) =>
                `${endLineNumber}:${endColumn} ${message}`
            )
            .join('\n'),
        });
      },
    }),
    [formData, response, markers]
  );

  const onChangePath = (e: ChangeEvent<HTMLInputElement>) =>
    setFormData((prev) => ({ ...prev, path: e.target.value }));

  const onChangeHeader = useCallback(
    debounce(
      (headers: MapData[]) => setFormData((prev) => ({ ...prev, headers })),
      500
    ),
    []
  );

  const onChangeMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, labels } = e.target;

    if (!labels) return;
    setFormData((prev) => {
      if (checked) {
        return {
          ...prev,
          methods: {
            ...prev.methods,
            [labels[0].innerText]: { delay: 0, status: 200 },
          },
        };
      }

      delete prev.methods[labels[0].innerText];
      return { ...prev };
    });
  };

  return (
    <>
      <FormGroup>
        <FormLabel
          required
          sx={{ '& .MuiFormLabel-asterisk': { color: 'red' } }}
        >
          Path
        </FormLabel>
        <Input type="text" value={formData.path} onChange={onChangePath} />
      </FormGroup>
      <FormGroup>
        <FormLabel>Headers</FormLabel>
        <MapInput datas={formData.headers} onChange={onChangeHeader} />
      </FormGroup>
      <FormGroup>
        <FormLabel>Methods</FormLabel>
        <Stack direction="row">
          {['GET', 'POST', 'PATCH', 'PUT', 'DELETE'].map((method) => (
            <FormControl key={method} size="small">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      Object.keys(formData.methods)?.indexOf(method) > -1
                    }
                    onChange={onChangeMethod}
                  />
                }
                label={method}
              />
            </FormControl>
          ))}
        </Stack>
      </FormGroup>
      <FormGroup>
        <FormLabel>Response</FormLabel>
        <Monaco
          value={response}
          onChange={setResponse}
          onValidate={setMarkers}
        />
      </FormGroup>
    </>
  );
};

export default forwardRef(Form);
