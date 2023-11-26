import header from '../assets/gamaforce.png';

function Header() {
    return(
        <div id='header'>
            <div className='place-items-center'>
                 <a href='https://gamaforce.wg.ugm.ac.id/'><img src={header} width={180}></img></a>
            </div>
        </div>
    )
}
export default Header;