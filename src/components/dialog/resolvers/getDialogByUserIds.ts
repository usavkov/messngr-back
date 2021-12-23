import { Dialog } from "../../../entity";

export const findDialogByUserIds = async (userIds: string[]) => await Dialog
  .createQueryBuilder('dialog')
  .where('dialog.userIds @> :userIds', { userIds })
  .getOne();

export const getDialogByUserIdsResolver = async (
  _parent,
  { userIds },
) => {
  try {
    const dialog = await findDialogByUserIds(userIds);

    if (!dialog) throw new Error('Dialog is not found')

    return dialog;
  } catch (errors) {
    throw errors;
  }
};
