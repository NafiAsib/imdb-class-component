import React, { Component } from 'react';

class TableHeader extends Component {
    render() {
        const { columns } = this.props;
        console.log(columns);
        return (
            <>
                <thead>
                    <tr>
                        {columns.map((item) => (
                            <th scope="col">{item.label}</th>
                        ))}
                    </tr>
                </thead>
            </>
        );
    }
}

export default TableHeader;
