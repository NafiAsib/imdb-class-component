import React, { Component } from 'react';

class TableBody extends Component {
    render() {
        const { items, columns } = this.props;

        return (
            <>
                {items.map((item) => {
                    return (
                        <tr>
                            <th scope="row">{item.rank}</th>
                            <td>{item.title}</td>
                            <td>
                                <img
                                    src={item.posterUrl}
                                    alt="poster"
                                    height={100}
                                    width={'auto'}
                                />
                            </td>
                            <td>
                                <i className="bi bi-heart"></i>
                            </td>
                            <td></td>
                        </tr>
                    );
                })}
            </>
        );
    }
}

export default TableBody;
