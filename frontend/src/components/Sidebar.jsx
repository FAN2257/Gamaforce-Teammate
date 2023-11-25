import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import home from "../assets/home.png";
import add from "../assets/add.png";
import hapus from "../assets/delete.png";

export default function Sidebar() {
    const [data, setData] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    const [missionDelete, setMissionDelete] = useState(false);
    const [missionAdd, setMissionAdd] = useState(false);
    const [missionList, setMissionList] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3001")
            .then((response) => response.json())
            .then((dataresponse) => {
                console.log(dataresponse);
                setData(dataresponse);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    async function functionMissionAdd() {
        const { value: newMission } = await Swal.fire({
            title: "Masukkan Misi",
            input: "text",
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "Misi tidak boleh kosong!";
                }
            }
        });
        if (newMission) {
            Swal.fire(`Misi ${newMission} telah berhasil!`);
        }
    }

    async function funtionMissionDelete() {
        await Swal.fire({
            title: "Anda yakin akan menghapus misi?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Hapus",
            cancelButtonText: "Batal",
        });
    }

    async function functionMissionList() {
        const missionListContent = (
            <div>
                <p>List of Missions:</p>
                <ul>
                    {data.map((row) => (
                        <li key={row.id}>
                            {row.nama}
                        </li>
                    ))}
                </ul>
            </div>
        );
        await Swal.fire({
            title: "List Misi",
            html: missionListContent,
        });
    }

    return (
        <div className="flex flex-col text-center bg-blue-50 w-64 h-screen py-5 gap-3.5">
            <p className="font-bold">Pengaturan Misi</p>
            <div id="home" className="flex flex-row px-8">
                <img src={home} width={18}></img>
                <button onClick={() => { setMissionList(!missionList); functionMissionList(); }} className="hover:text-blue-600 px-5">
                    Load Misi
                </button>
            </div>
            <div id="add" className="flex flex-row px-8">
                <img src={add} width={18}></img>
                <button onClick={() => { setMissionAdd(!missionAdd); functionMissionAdd(); }} className="hover:text-blue-600 px-5">
                    Tambah Misi
                </button>
            </div>
            <div id="hapus" className="flex flex-row px-8">
                <img src={hapus} width={16}></img>
                <button onClick={() => { setMissionDelete(!missionDelete); funtionMissionDelete(); }} className="hover:text-blue-600 px-6">
                    Hapus Misi
                </button>
            </div>
        </div>
    );
}
