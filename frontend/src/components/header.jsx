import header from '../assets/gamaforce.png';

function Header() {
    return(
        <div id='header'>
            <div className='place-items-center'>
                <img src={header} width={180}></img>
            </div>
        </div>
    )
}
export default Header;