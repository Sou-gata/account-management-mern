import { Popconfirm } from "antd";
import React from "react";
import { BsInfoCircle } from "react-icons/bs";
import { dateToTimeString } from "../utils";

const Popup = ({ record, total }) => {
    return (
        <Popconfirm
            title={null}
            okText="OK"
            showCancel={false}
            description={() => (
                <div className="text-slate-100">
                    <p>
                        <span className="text-[#94e2cd]">Created By: </span>
                        {record?.createdBy?.name || record?.createdBy}
                    </p>
                    <p>
                        <span className="text-[#94e2cd]">Created At: </span>
                        {dateToTimeString(record?.createdAt)}
                    </p>
                    {record?.updatedBy && (
                        <p>
                            <span className="text-[#94e2cd]">Updated By: </span>
                            {record?.updatedBy?.name || record?.updatedBy}
                        </p>
                    )}
                    {record?.updatedAt && (
                        <p>
                            <span className="text-[#94e2cd]">Updated At: </span>
                            {dateToTimeString(record?.updatedAt)}
                        </p>
                    )}
                    {total && (
                        <div>
                            <table>
                                <thead>
                                    <th className="p-2">OFD</th>
                                    <th className="p-2">Delivered</th>
                                    <th className="p-2">OFP</th>
                                    <th className="p-2">Pickup</th>
                                    <th className="p-2">Undelivered</th>
                                    <th className="p-2">Total</th>
                                    <th className="p-2">Cash</th>
                                    <th className="p-2">Online</th>
                                    <th className="p-2">Due</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="text-center">
                                            {total.ofd}
                                        </td>
                                        <td className="text-center">
                                            {total.delivered}
                                        </td>
                                        <td className="text-center">
                                            {total.ofp}
                                        </td>
                                        <td className="text-center">
                                            {total.pickup}
                                        </td>
                                        <td className="text-center">
                                            {total.undelivered}
                                        </td>
                                        <td className="text-center">
                                            {total.total}
                                        </td>
                                        <td className="text-center">
                                            {total.cash}
                                        </td>
                                        <td className="text-center">
                                            {total.online}
                                        </td>
                                        <td className="text-center">
                                            {total.due}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
            icon={null}
        >
            <div className="w-full flex-center cursor-pointer">
                <BsInfoCircle size={20} />
            </div>
        </Popconfirm>
    );
};

export default Popup;
