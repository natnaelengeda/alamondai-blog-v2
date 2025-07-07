import React from 'react'
import { Modal } from '@mantine/core';

interface ISignInModal {
  opened: boolean;
  close: () => void;
}

export default function SignInModal({ opened, close }: ISignInModal) {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Authentication">

    </Modal>
  )
}
