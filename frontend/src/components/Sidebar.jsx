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
        fetch("http://localhost:3001/drawings")
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
            const response = await fetch("http://localhost:3001/drawings", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({newMission}),
            });
            const result = await response.json();
            Swal.fire(`Misi ${newMission} berhasil ditambahkan!`);
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

    // async function functionMissionList() {
    //     try {
    //         const response = await fetch('http://localhost:3001/drawings', {
    //             method: 'GET',
    //         });

    //         const data = await response.json();

    //         if (Array.isArray(data)) {
    //             const missionContent = (
    //                 <div>
    //                     <ul>
    //                         {data.map((row) => (
    //                             <li key={row.id}>{row.nama}</li>
    //                         ))}
    //                     </ul>
    //                 </div>
    //             )

    //             await Swal.fire({
    //                 title: "List Misi",
    //                 html: missionContent,
    //             })
    //         }
    //         console.log('Data from server: ', data);
    //         return data;
    //     }
    //     catch(error) {
    //         console.error('Error from server: ', error);
    //         alert('Terjadi kesalahan saat mengambil data dari server.');
    //         return null;
    //     }
        

    async function functionMissionList() {
        const data = await fetchData();
        const missionList = generateMissionList(data);
        await Swal.fire({
            title: "List Misi",
            html: await missionList,
        });
    }

    async function fetchData() {
        try {
            const response = await fetch('http://localhost:3001/drawings');
            if(!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Data from server: ', data);
            return data;
        }
        catch(error) {
            console.error('Error from server: ', error);
        }
        
    }

    async function generateMissionList() {
        if(Array.isArray(data)) {
            const missionListContainer = document.createElement('div');
            missionListContainer.innerHTML = '';

            const ulElement = document.createElement('ul');
            data.forEach((mission) => {
                const liElement = document.createElement('li');
                liElement.textContent = mission.nama || 'Nama tidak tersedia';
                ulElement.appendChild(liElement);
            });
            missionListContainer.appendChild(ulElement);
            const generatedHTML = missionListContainer.innerHTML;
            console.log('Generated HTML:', generatedHTML); 
            return `<ul>${data.map((mission) => `<li>${mission.nama}</li>`).join('')}</ul>`;
        }
        else {
            console.error('Data dari server bukan array: ', data);
            return 'Terdapat kesalahan format data';
        }
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
