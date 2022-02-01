import React, { Component } from 'react';

class TableHeader extends Component {
    handleSort = ({ key, isSortable }) => {
        // console.log('!okay');
        if (!isSortable) return null;
        // console.log('okay');
        const { onSort, sortingProps } = this.props;

        if (sortingProps.key === key) {
            if (sortingProps.order === 'asc') {
                console.log('okay');

                onSort({ key, order: 'desc' });
            } else {
                onSort({ key, order: 'asc' });
            }
        } else {
            onSort({ key, order: 'asc' });
        }
    };

    getSortingIcon = (item, sortingProps) => {
        if (sortingProps.key === item.key) {
            if (sortingProps.order === 'asc') {
                return <i className="bi bi-sort-down" />;
            } else {
                return <i className="bi bi-sort-down-alt" />;
            }
        } else return null;
    };

    render() {
        const { columns, sortingProps } = this.props;
        // console.log(columns);
        return (
            <>
                <thead>
                    <tr>
                        {columns.map((item) => (
                            <th
                                scope="col"
                                key={item.label}
                                onClick={() => this.handleSort(item)}
                            >
                                {item.label}{' '}
                                {this.getSortingIcon(item, sortingProps)}
                            </th>
                        ))}
                    </tr>
                </thead>
            </>
        );
    }
}

export default TableHeader;
