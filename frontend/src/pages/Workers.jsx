import { Space, Table, Modal, Tag, Popconfirm } from "antd";
import { BsFillTrashFill, BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit, AiOutlineUserAdd } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import toast from "../utils";
import { Context } from "../context/UserContext";
import Popup from "../components/Popup";

const Workers = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [id, setId] = useState("");
    const [update, setUpdate] = useState(false);

    const { user } = useContext(Context);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:4000/api/user/all"
                );
                let tempData = [];
                data.forEach((element) => {
                    tempData.push({
                        key: element._id,
                        name: element.name,
                        age: element.age,
                        mobile: element.mobile,
                        address: element.address,
                        isActive: element.isActive,
                        createdAt: element?.createdAt,
                        updatedAt: element?.updatedAt,
                        createdBy: element?.createdBy?.name,
                        updatedBy: element?.updatedBy?.name,
                    });
                });
                console.log(data);
                setUsers(tempData);
            } catch (error) {
                toast("error", error.message);
            }
        };
        getUsers();
    }, [update]);

    const editHandler = (id) => {
        navigate(`/workers/edit/${id}`);
    };
    const deleteHandler = async () => {
        if (!user?.admin) {
            toast("error", "You are not authorized to delete");
            return;
        }
        try {
            const { data } = await axios.delete(
                `http://localhost:4000/api/user/delete/${id}`
            );
            if (!data.error) {
                toast("success", "Worker deleted successfully");
            } else {
                toast("error", data.message);
            }
            setUpdate(!update);
        } catch (error) {
            toast("error", error.message);
        }
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Age",
            dataIndex: "age",
            key: "age",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Mobile",
            dataIndex: "mobile",
            key: "mobile",
        },
        {
            title: "Active",
            dataIndex: "isActive",
            key: "active",
            render: (_, record) => (
                <Tag color={record.isActive ? "green" : "red"}>
                    {record.isActive ? "Yes" : "No"}
                </Tag>
            ),
        },
        {
            title: "Details",
            dataIndex: "details",
            key: "details",
            render: (_, record) => <Popup record={record} />,
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <button
                        onClick={() => {
                            editHandler(record.key);
                        }}
                        className="btn view-btn"
                    >
                        <AiOutlineEdit />
                    </button>
                    <button
                        onClick={() => {
                            setIsModalOpen(true);
                            setId(record.key);
                        }}
                        className="btn del-btn"
                    >
                        <BsFillTrashFill />
                    </button>
                </Space>
            ),
        },
    ];

    return (
        <div className="workers">
            {user?.admin && (
                <div>
                    <Link to="add" className="custom-button flex-center gap-3">
                        <AiOutlineUserAdd />
                        <p className="cursor-pointer">Add Workers</p>
                    </Link>
                </div>
            )}
            <div>
                <Table
                    bordered
                    pagination={false}
                    columns={columns}
                    dataSource={users}
                />
            </div>
            <Modal
                title="Confirmation"
                open={isModalOpen}
                onOk={(e) => {
                    setIsModalOpen(false);
                    deleteHandler();
                }}
                onCancel={() => {
                    setIsModalOpen(false);
                }}
                okButtonProps={{ style: { background: "#bb2d3b" } }}
                cancelButtonProps={{
                    style: {
                        background: "#3da58a",
                        color: "#fff",
                        border: "none",
                    },
                }}
            >
                <p className="text-slate-100 text-xl">
                    Are you sure you want to delete ?
                </p>
            </Modal>
        </div>
    );
};
export default Workers;
