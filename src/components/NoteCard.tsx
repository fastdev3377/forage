import './NoteCard.css';
import { NoteCardProps } from '../Interfaces';
import { deleteNote, updateNote } from '../service/data';

function NoteCard(props: NoteCardProps) {
  const removeNote = () => {
    deleteNote(props.note.index)
    props.refreshNotes()
  }

  const archiveNote = () => {
    const {
      title,
      content,
    } = props.note
    updateNote(title, content, props.note, 'false')
    props.refreshNotes()
  }

  return (
    <div className='Note-card'>
      <div id='saved-title' className='Btn-style'>
        {props.note.title}
      </div>
      <button className='Btn-style' onClick={() => props.viewNote(props.note)}>
        View
      </button>
      <button test-id={`edit-button-${props.note.title}`} className='Btn-style' onClick={() => props.editNote(props.note)}>
        Edit
      </button>
      <button test-id={`archive-button-${props.note.title}`} className='Btn-style' onClick={archiveNote}>
        Archive
      </button>
      <button test-id={`delete-button-${props.note.title}`} className='Btn-style' onClick={removeNote}>
        Delete
      </button>
    </div>
  );
}

export default NoteCard;
