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
import type { editor } from 'monaco-editor';
import type { JSONData } from '~/types/features';

export type EventRef = {
  resetFormData: () => void;
  getFormData: () => JSONData;
};

const defaultForm = {
  path: '',
  headers: [],
  methods: {},
};

const checkJson = (val: any) => {
  try {
    return JSON.parse(val);
  } catch (err) {
    return val.toString();
  }
};

const Form = (_: null, ref: ForwardedRef<EventRef>) => {
  const [formData, setFormData] = useState<JSONData>(deepClone(defaultForm));

  useImperativeHandle(
    ref,
    () => ({
      resetFormData: () => {
        setFormData(deepClone(defaultForm));
      },
      getFormData: () => formData,
    }),
    [formData]
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
      return prev;
    });
  };
  const onChangeResposne = (str: string) => {
    setFormData((prev) => ({ ...prev, response: checkJson(str) }));
  };

  const onResponseValidate = (marker: editor.IMarker[], value?: string) => {
    if (!marker.length) {
      setFormData((prev) => {
        return { ...prev, response: checkJson(value ?? '') };
      });
    }
  };

  return (
    <>
      <FormGroup>
        <FormLabel>Path</FormLabel>
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
          value={JSON.stringify(formData.response, null, 2)}
          onChange={onChangeResposne}
          onValidate={onResponseValidate}
        />
      </FormGroup>
    </>
  );
};

export default forwardRef(Form);
