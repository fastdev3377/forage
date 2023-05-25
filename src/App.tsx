import React from 'react';
import './App.css';
import Header from './components/Header';
import ForageButton from './components/ForageButton';
import NoteModal from './components/NoteModal';
import { Note } from './Interfaces';
import NoteCard from './components/NoteCard';
import { readNotes } from './service/data';

function App() {
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const addBtnClicked = () => {
    setIsModalVisible(true);
  }

  const [savedNotes, setSavedNotes] = React.useState<Note[]>([])
  const [noteToBeEdited, setNoteToBeEdited] = React.useState<Note | null>(null)
  const [noteToBeViewed, setNoteToBeViewed] = React.useState<Note | null>(null)

  const refreshNotes = () => {
    const notes = readNotes()
    if (!notes) return
    setSavedNotes(notes)
  }

  const editNote = (note: Note) => {
    setNoteToBeEdited(note)
    setIsModalVisible(true)
  }

  const viewNote = (note: Note) => {
    setNoteToBeViewed(note)
    setIsModalVisible(true)
  }

  React.useEffect(() => {
    refreshNotes()
  }, [])

  const closeModal = () => {
    setNoteToBeEdited(null)
    setNoteToBeViewed(null)
    setIsModalVisible(false)
    refreshNotes()
  }

  return (
    <div className='App-container'>
      <Header refreshNotes={refreshNotes}/>
      {
        savedNotes.map(note => {
          if (!note.unarchived) return null
          return (
            <NoteCard
              key={note.id}
              note={note}
              refreshNotes={refreshNotes}
              editNote={editNote}
              viewNote={viewNote}
            />
          )
        })
      }
      <ForageButton
        id='add-new-note-button'
        onClick={addBtnClicked}
        text={'Add a note!'}
      />
      <NoteModal
        editNote={noteToBeEdited}
        viewNote={noteToBeViewed}
        isVisible={isModalVisible}
        closeModal={closeModal}
      />
    </div>
  );
}

export default App;
