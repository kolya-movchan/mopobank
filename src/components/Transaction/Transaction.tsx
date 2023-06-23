import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

import { useAppDispatch } from '../../app/hooks';
import { EditingTransaction } from '../../routes/History';
import {
  deleteIncome,
  deleteExpenses,
  saveTransaction
} from '../../reducers/balanceReducer';

type Props = {
  transaction: {
    name: string,
    type: string,
    amount: number,
    currentBalance: number,
    time: string,
    id: string,
  },
  onEditInfo: Dispatch<SetStateAction<EditingTransaction | undefined>>,
  onEdit: React.Dispatch<React.SetStateAction<boolean>>,
}

export const Transaction: React.FC<Props> = ({ transaction, onEditInfo, onEdit }) => {
  const dispatch = useAppDispatch();

  const { name, type, amount, currentBalance, time, id } = transaction;

  const showEdit = (id: string, name: string, amount: number, type: string) => {
    onEditInfo({
      id,
      name,
      amount,
      type,
    })

    onEdit(true)
  }

  const handleTransactionDelete = (id: string, amount: number, type: string) => {
    if (type === 'income') {
      dispatch(deleteIncome({id, amount}));
    } else {
      dispatch(deleteExpenses({id, amount}));
    }

    dispatch(saveTransaction());
  }

  return (
    <>
      <tr
        className={type === 'income' ? 'table-success' : 'table-danger'}
        key={id}
      >
        <td>{name}</td>
        <td>{type}</td>
        <td>{(type === 'expenses' && amount !== 0) && '-' }{amount.toLocaleString()}</td>
        <td>{currentBalance.toLocaleString()}</td>
        <td>{new Date(time).toLocaleString()}</td>
        <td>
          <button
            className='tools'
            onClick={() => showEdit(id, name, amount, type)}
          >
            <img
              src="./edit.svg"
              alt="edit logo"
              className='tools__logo'
            />
          </button>

          <button
            className='tools'
            onClick={() => {
              handleTransactionDelete(id, amount, type);
              toast.success('Transaction deleted successfully!');
            }}
          >
            <img
              src="./delete.svg"
              alt="delete logo"
              className='tools__logo'
            />
          </button>
        </td>
      </tr>
    </>
  )
}