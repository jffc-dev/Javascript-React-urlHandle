import React from 'react'
import { Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import GeneralTableButton from '../../../components/General/TableButton/TableButton'

const TableComponent = ({ data, heads, actions }) => {
  // const action1Handle = (item) => {
  //   action1Function(item)
  // }
  return (
    <Table striped responsive>
      <thead className="table-dark">
        <tr>
          {Object.entries(heads).map(([key, value]) => (
            <th key={key} style={{ width: value.width + '%' }}>
              {value.name}
            </th>
          ))}
          {actions && <th>Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          return (
            <tr key={index}>
              {Object.entries(heads).map(([key, value]) => (
                <th key={key} style={{ width: value.width + '%' }}>
                  {item[key]}
                </th>
              ))}

              <th>
                {actions &&
                  actions.map((action, indexAct) => (
                    <GeneralTableButton
                      key={'action_' + index + '_' + indexAct}
                      faIcon={action.actionIcon}
                      msgTooltip={action.actionText}
                      action={(_) => action.actionFunction(item)}></GeneralTableButton>
                  ))}
              </th>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default TableComponent
