import React from 'react'
import Button from '../button/Button'

export interface BulkActionProps{
  onRemove: () => void
}

const BulkAction: React.FC<BulkActionProps> = ({ onRemove }) => {
  return (
    <div className='bulk-action'>
        <span className='bulk-action__title'>Bulk Action</span>
        <div className='bulk-action__buttons'>
            <Button type='secondary'>Done</Button>
            <Button onClick={onRemove} type='danger'>Remove</Button>
        </div>
    </div>
  )
}

export default BulkAction