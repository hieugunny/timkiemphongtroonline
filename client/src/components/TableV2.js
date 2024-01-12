import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import DetailCell from "./DetailCell";
import { useSelector } from "react-redux";
export default function TableV2({ columns, data }) {
    if (!data) data = []
    else {

        data = data.map(el => {
            return {
                id: el.id,
                name: el.name,
                avatar: el.avatar,
                countPost: el.postData.length,
                createdAt: el.createdAt
            }
        })
    }

    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups, if your table has groupings
        rows, // rows for the table based on the data passed
        prepareRow // Prepare the row (this function needs to be called for each row before getting the row props)
    } = useTable({
        columns,
        data
    });
    function handlerDateDisplay(datetime) {

        //2024-01-06T05:24:14.000Z
        const dayOfTheWeekList = [
            {
                id: 0,
                name: 'Chủ Nhật'
            },
            {
                id: 1,
                name: 'Thứ hai'
            },
            {
                id: 2,
                name: 'Thứ ba'
            },
            {
                id: 3,
                name: 'Thứ tư'
            },
            {
                id: 4,
                name: 'Thứ năm'
            },
            {
                id: 5,
                name: 'Thứ sáu'
            },
            {
                id: 6,
                name: 'Thứ bảy'
            },

        ]
        const dayNumber = (new Date(datetime)).getDay()
        const day = dayOfTheWeekList.find(el => el.id === dayNumber)?.name
        let date = datetime?.split('T')[0]?.split('-')
        let time = datetime?.split('T')[1]?.replace('.000Z', '')
        if (!time) return '---'
        return `${time} ${day} ${date[2]}/${date[1]}/${date[0]}`
    }
    function handlerStatus(obj) {
        const statusList = [
            {
                id: 1,
                text: "Chưa thanh toán",
                color: 'font-bold text-yellow-500 h-[280px] '
            },
            {
                id: 2,
                text: "Đã hết hạn",
                color: 'font-bold text-[#e57373]'

            },
            {
                id: 3,
                text: "Đang ẩn",
                color: 'font-bold text-gray-500'

            },
            {
                id: 4,
                text: "Đang hiện",
                color: 'font-bold text-green-500'

            },

        ]
        if (!obj.startedAt || !obj.expiredAt) return <span className={statusList[0].color}>{statusList[0].text}</span>
        else if (new Date(obj.expiredAt) < new Date(Date.now())) return <span className={statusList[1].color}>{statusList[1].text}</span>
        else if (obj.isHidden) return <span className={statusList[2].color}>{statusList[2].text}</span>
        return <span className={statusList[3].color}>{statusList[3].text}</span>
    }

    function isExpired(obj) {
        return new Date(obj?.startedAt) < new Date()
    }
    if (!data || !columns) {
        return (
            <div>Nothing</div>
        )
    }

    /* 
      Render the UI for your table
      - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
    */
    const tableCss = "border-[1px] border-gray-500   "
    const boxCss = ' flex justify-around  w-full '
    return (
        <table {...getTableProps()} className=" border-collapse border-spacing-1  border border-slate-500 w-full bg-gray-200">
            <thead className={''}>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()} className={tableCss}>
                        {headerGroup.headers.map(column => {
                            return (
                                (<th  {...column.getHeaderProps()} className={tableCss + 'bg-gray-700 text-white'}>{column.render("Header")}</th>)
                            )
                        })}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}
                className={tableCss}>
                {rows.map((row, i) => {
                    prepareRow(row);
                    // console.log(row);
                    return (<>
                        <tr {...row.getRowProps()} className={tableCss}>
                            {row.cells.map((cell, idx) => {
                                // { console.log(row.cells) }
                                return (
                                    <>

                                        {cell.render("Cell").props.column.id === 'id'
                                            && <td className={tableCss + ' px-2 py-1 h-[200px]'} {...cell.getCellProps()}>#{cell.render("Cell")}</td>}

                                        {cell.render("Cell").props.column.id === 'avatar'
                                            && <td className={tableCss + ' px-2 py-1 w-[200px]'} {...cell.getCellProps()}><img src={cell.render("Cell").props.cell.value || 'https://phongtro123.com/images/default-user.png'} className="h-[200px] w-[200px] object-cover" /></td>}

                                        {cell.render("Cell").props.column.id === 'name'
                                            && <td className={tableCss + ' px-2 py-1'} {...cell.getCellProps()}>{cell.render("Cell")}</td>}

                                        {cell.render("Cell").props.column.id === 'countPost'
                                            && <td className={tableCss + ' px-2 py-1'} {...cell.getCellProps()}>{cell.render("Cell")}</td>}

                                        {cell.render("Cell").props.column.id === 'createdAt'
                                            && <td className={tableCss + ' px-2 py-1'} {...cell.getCellProps()}> {handlerDateDisplay(cell.render("Cell").props.value)}</td>}

                                        {cell.render("Cell").props.column.id === 'option'
                                            && <td className={tableCss + ' px-2 py-1'} {...cell.getCellProps()}>
                                                <ul>
                                                    <li className="bg-secondary1 rounded-md px-[3px] flex justify-center mb-[10px] text-white">
                                                        Lịch sử hoạt động
                                                    </li>
                                                    
                                                    <li className="bg-red-500 rounded-md px-[3px] flex justify-center mb-[10px] text-white">
                                                        Khóa
                                                    </li>
                                                </ul> 
                                            </td>}

                                    </>

                                )
                            })}
                        </tr>
                    </>);
                })}
            </tbody>
        </table>
    );
}