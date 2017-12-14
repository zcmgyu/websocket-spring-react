import React from 'react';

const Employee = (props) => {
    const { firstName, lastName, description } = props.employee
    return (
        <tbody>
            <tr>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{description}</td>
            </tr>
        </tbody>

    )
}

const EmployeeList = (props) => {
    const employees = props.employees.map(employee =>
        <Employee key={employee.id} employee={employee} />
    )

    return (
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            {employees}


        </table>
    )
}



export default EmployeeList