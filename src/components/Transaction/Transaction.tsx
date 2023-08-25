import classNames from 'classnames'
import 'react-confirm-alert/src/react-confirm-alert.css'

import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { useAppDispatch, useEditFormOpen, useModalWindowDelete, useSelectorData } from '../../hooks/hooks'
import { setNewTranscationId } from '../../reducers/newTransaction'
import { EditingTransaction } from '../../types/Transaction'
import { calculateTimeFormat } from '../../utils/calculations'

type Props = {
  transaction: {
    name: string
    type: string
    amount: number
    currentBalance: number
    time: string
    id: string
  }
  onEditInfo: Dispatch<SetStateAction<EditingTransaction | undefined>>
}

export const Transaction: React.FC<Props> = ({ transaction, onEditInfo }) => {
  const dispatch = useAppDispatch()
  const { darkMode, newTransactionId } = useSelectorData()
  const { name, type, amount, currentBalance, time, id } = transaction

  useEffect(() => {
    setTimeout(() => {
      dispatch(setNewTranscationId(''))
    }, 1000)
  }, [])

  return (
    <tr
      key={id}
      className={classNames({
        'new-row': id === newTransactionId && !location.hash.includes('/transactions'),
      })}
    >
      <td
        className={classNames('transaction-cell-name', {
          'transaction-cell-name--dark-mode': darkMode,
        })}
      >
        {name}
      </td>
      <td
        className={classNames(
          'transaction-cell',
          { 'income-cell': type === 'income' },
          { 'expense-cell': type === 'expenses' }
        )}
      >
        {type}
      </td>
      <td
        className={classNames('transaction-cell-amount', {
          'transaction-cell-amount--dark-mode': darkMode,
        })}
      >
        {type === 'expenses' && amount !== 0 && '-'} ${amount.toLocaleString()}
      </td>
      <td
        className={classNames('transaction-cell-balance', {
          'transaction-cell-balance--dark-mode': darkMode,
        })}
      >
        ${currentBalance.toLocaleString()}
      </td>
      <td
        className={classNames('time-cell', {
          'time-cell--dark-mode': darkMode,
        })}
      >
        {calculateTimeFormat(time).formattedDate}{' '}
        <span className="hours-cell">at {calculateTimeFormat(time).formattedTime}</span>
      </td>
      <td>
        <div className="tools-container">
          <button
            className={classNames('edit-button', {
              'edit-button--dark-mode': darkMode,
            })}
            onClick={() => useEditFormOpen(id, name, amount, type, onEditInfo, dispatch)}
          >
            <img src="./edit.svg" alt="edit logo" className="tools" />
          </button>
          <button
            className={classNames('delete-button', {
              'delete-button--dark-mode': darkMode,
            })}
            onClick={useModalWindowDelete(darkMode, id, amount, type, dispatch)}
          >
            <img src="./delete.svg" alt="delete logo" className="tools" />
          </button>
        </div>
      </td>
    </tr>
  )
}
