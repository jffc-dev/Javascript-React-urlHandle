import React from 'react'
import { Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import GeneralTableButton from '../../../components/General/TableButton/TableButton'
import { TemplateParser } from '../../../models/TemplateParser'
import './TableComponent.css'

const TableComponent = ({ data, setData, heads, actions }) => {
  return (
    <Table striped responsive>
      <thead className="table-dark">
        <tr>
          {actions && <th className="sticky-col table-head-center">Acciones</th>}
          {Object.entries(heads).map(([key, value]) => (
            <th key={key} className="table-head-center" style={{ width: value.width + 'px' }}>
              {value.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          return (
            <tr key={index}>
              <th className="sticky-col sticky-col-tbody">
                {actions &&
                  actions.map((action, indexAct) => (
                    <GeneralTableButton
                      key={'action_' + index + '_' + indexAct}
                      faIcon={action.actionIcon}
                      msgTooltip={action.actionText}
                      action={(_) =>
                        action.actionFunction(item, data, setData)
                      }></GeneralTableButton>
                  ))}
              </th>

              {Object.entries(heads).map(([key, value]) => (
                <th key={key} style={{ width: value.width + 'px' }}>
                  {TemplateParser(item[key], value.type)}
                </th>
              ))}
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default TableComponent
