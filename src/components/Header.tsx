import { HeaderProps } from '../Interfaces';
import { readNotes, updateNote } from '../service/data';
import ForageButton from './ForageButton';
import './Header.css';

function Header(props: HeaderProps) {
  const unarchiveNotes = () => {
    const notes = readNotes()
    if (!notes) return
    notes.forEach(note => {
      if (note.unarchived) {
        updateNote(note.title, note.content, note, 'true')
      }
    })
    props.refreshNotes()
  }

  return (
    <div className='Header'>
      <div className='Logo-container'>
        <img
          src='Forage_Icon_Green.png'
          alt='Not Found'
          className='Logo'
        />
      </div>
      <div className='Title'>
        Forage Notes
      </div>
      <div className='Btn-container'>
        <ForageButton
          id='unarchive-button'
          onClick={unarchiveNotes}
          text={'Unarchive'}
          style={{
            marginRight: '20px',
            width: '60%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#DCFFE0',
            marginTop: 'unset'
          }}
        />
      </div>
    </div>
  );
}

export default Header;
