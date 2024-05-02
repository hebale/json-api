import React, { useState, useEffect } from 'react';
import { Tooltip, IconButton } from '@mui/material';

import CodeIcon from '@mui/icons-material/Code';

import useAlert from '~/hooks/useAlert';
import useModal from '~/hooks/useModal';
import useDialog from '~/hooks/useDialog';

import Contents from './Contents';
import { getJsonMethos } from '~/api';

type EditPipelineProps = {
  path: string;
  method: string;
};

const EditPipeline = ({ path, method }: EditPipelineProps) => {
  const { openAlert } = useAlert();
  const { openModal } = useModal();
  const { openDialog } = useDialog();

  const [code, setCode] = useState<{
    isActive: boolean;
    value: null | string;
  } | null>(null);

  useEffect(() => {
    (async () => {
      const response = await getJsonMethos({ path, method });
      setCode(response?.data.code ?? null);
    })();
  }, []);

  const open = () => {
    openDialog({
      title: 'Reponse Pipeline',
      props: {
        maxWidth: 'lg',
      },
      content: <Contents path="/" value={code?.value ?? ''} />,
    });
  };

  return (
    <Tooltip title="Inject JS" placement="top" arrow>
      <IconButton onClick={open} {...(code?.isActive && { color: 'primary' })}>
        <CodeIcon />
      </IconButton>
    </Tooltip>
  );
};

export default EditPipeline;
