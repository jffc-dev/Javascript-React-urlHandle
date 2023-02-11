import React from 'react'
import { Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const TableComponent = ({ data, heads }) => {
  Object.entries(heads).map((head, index) => {
    console.log(head, index)
    return null
  })

  data.map((item, index) => {
    const d2 = []
    const d3 = Object.entries(item).forEach(([key, value]) => {
      console.log(key)
      if (Object.keys(heads).includes(key)) {
        d2.push(value)
      }
    })
    console.log(d2)
    return d3
  })

  return (
    <Table striped bordered responsive>
      <thead className="table-dark">
        <tr>
          {Object.entries(heads).map(([key, value]) => (
            <th key={key}>{value}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          const d2 = []
          Object.entries(item).forEach(([key, value]) => {
            if (Object.keys(heads).includes(key)) {
              d2.push(value)
            }
          })
          console.log(d2)
          return (
            <tr key={index}>
              {d2.map((item, index1) => (
                <td key={index1}>{item}</td>
              ))}
            </tr>
          )
        })}
        {/* <tr>
          {Array.from({ length: 12 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr> */}
      </tbody>
    </Table>
  )
}

export default TableComponent
