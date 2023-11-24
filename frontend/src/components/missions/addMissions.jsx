export default function AddMission() {
    const handleClick = () => {
        let mission = prompt("Input misi: ");
        getMission[0](misi)
        getMission[1](true)
    }

    return(
        <div>
            <button id="buttonAdd" onClick={() => handleClick()}>Input misi baru</button>
        </div>
    )
}