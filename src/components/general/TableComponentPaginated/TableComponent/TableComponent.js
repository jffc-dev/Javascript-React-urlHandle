import React from 'react'
import { Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import GeneralTableButton from '../../TableButton/TableButton'
import { TemplateParser } from '../../../../models/TemplateParser'
import './TableComponent.css'

const TableComponent = ({ data, setData, heads, actions }) => {
  return (
    <Table striped responsive>
      <thead className="table__head">
        <tr>
          {actions && <th className="sticky-col table-head-center">Actions</th>}
          {Object.entries(heads).map(([key, value]) => (
            <th key={key} className="table-head-center" style={{ width: value.width + 'px' }}>
              {value.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="table__tbody">
        {data.map((item, index) => {
          return (
            <tr key={index}>
              <td className="sticky-col sticky-col-tbody">
                <div className="table__actions">
                  {actions &&
                    actions.map((action, indexAct) => (
                      <GeneralTableButton
                        key={'action_' + index + '_' + indexAct}
                        faIcon={action.actionIcon}
                        msgTooltip={action.actionText}
                        color={action.actionColor}
                        action={(_) =>
                          action.actionFunction(item, data, setData)
                        }></GeneralTableButton>
                    ))}
                </div>
              </td>

              {Object.entries(heads).map(([key, value]) => (
                <td key={key}>
                  <p
                    style={{ width: value.width + 'px', overflowX: value.width && 'hidden' }}
                    className="table__tbody__text">
                    {TemplateParser(item[key], value.type)}
                  </p>
                </td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default TableComponent
