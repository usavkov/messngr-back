import { Dialog } from '../../../entity';

export const findDialogById = async (dialogId: string) => {
  const dialog = await Dialog.findOne(dialogId);

  return dialog;
};

export const getDialogByIdResolver = async (_parent, { dialogId }) => {
  try {
    const dialog = await findDialogById(dialogId);

    if (!dialog) throw new Error('Dialog not found');

    return dialog;
  } catch (errors) {
    throw errors;
  }
};
