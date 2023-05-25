import React from 'react';
import './NoteModal.css';
import ReactModal from 'react-modal';
import ForageButton from './ForageButton';
import { NoteModalProps, ModalType } from '../Interfaces';
import { createNote, updateNote } from '../service/data';

function NoteModal(props: NoteModalProps) {
  ReactModal.setAppElement('body');

  const [titleValue, setTitleValue] = React.useState<string>('')
  const [contentValue, setContentValue] = React.useState<string>('')
  const [modalType, setModalType] = React.useState<ModalType>(ModalType.addModal)

  React.useEffect(() => {
    if (props.viewNote) {
      setModalType(ModalType.viewModal)
      const { title, content } = props.viewNote
      setTitleValue(title)
      setContentValue(content)
    }
    else if (props.editNote) {
      setModalType(ModalType.editModal)
      const { title, content } = props.editNote
      setTitleValue(title)
      setContentValue(content)
    } else {
      setModalType(ModalType.addModal)
      setTitleValue('')
      setContentValue('')
    }
  }, [props])

  const addNote = () => {
    createNote(titleValue, contentValue)
    props.closeModal()
  }

  const editNote = () => {
    updateNote(titleValue, contentValue, props.viewNote)
    props.closeModal()
  }

  const cancel = () => {
    props.closeModal()
  }

  return (
    <ReactModal
      isOpen={props.isVisible}
      overlayClassName={'Modal-overlay'}
      className={'Modal'}
      onRequestClose={props.closeModal}
      shouldFocusAfterRender={true}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <input
        id='title'
        placeholder='Title'
        className='Note-title'
        onChange={(e) => {
          setTitleValue(e.target.value)
        }}
        value={titleValue}
        readOnly={modalType === ModalType.viewModal}
      />
      <textarea
        id='content'
        placeholder='Contents...'
        className='Note-content'
        onChange={(e) => {
          setContentValue(e.target.value)
        }}
        value={contentValue}
        readOnly={modalType === ModalType.viewModal}
      />
      <div className='Note-btn-container'>
        <ForageButton
          id='add-note-button'
          onClick={modalType === ModalType.editModal ? editNote : addNote}
          text={modalType === ModalType.editModal ? 'Edit Note' : 'Add Note'}
          disabled={modalType === ModalType.viewModal}
          style={{
            margin: '5px',
            flex: 1,
            width:
            '100%',
            backgroundColor: '#DCFFE0'
          }}/>
        <ForageButton
          onClick={cancel}
          text='Cancel'
          style={{
            margin: '5px',
            flex: 1,
            width: '100%',
            backgroundColor: '#DCFFE0'
          }}/>
      </div>
    </ReactModal>
  );
}

export default NoteModal;
