import React from 'react';

const Statistics = (props) => {
    return (
        <tbody>
            <tr>
                <td>{props.text}: {props.value}</td>
                
            </tr>
        </tbody>
    );
}

export default Statistics;