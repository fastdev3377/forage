import page from "./page_model/page";

const p = new page()

fixture`Forage Notes Tests`.page("http://localhost:3000").beforeEach(async () => {
  await p.resetLocalStorage()
});

test("Edit a note", async () => {
  const firstNoteTitle = 'First Note'
  const secondNoteTitle = 'Second Note'
  await p.clickAddNewNoteBtn()
  await p.writeNote(firstNoteTitle, 'These are the contents of the first note!')
  await p.clickAddNoteBtn()
  await p.clickEditNoteBtn(firstNoteTitle)
  await p.writeNote(secondNoteTitle, 'The first note was edited!')
  await p.clickAddNoteBtn()
  await p.expectCorrectTitle(secondNoteTitle)
});

test("Add two notes and delete both", async () => {
  const firstNoteTitle = 'First Note'
  const secondNoteTitle = 'Second Note'
  await p.clickAddNewNoteBtn()
  await p.writeNote(firstNoteTitle, 'These are the contents of the first note!')
  await p.clickAddNoteBtn()
  await p.clickAddNewNoteBtn()
  await p.writeNote(secondNoteTitle, 'The first note was edited!')
  await p.clickAddNoteBtn()
  await p.clickDeleteNoteBtn(firstNoteTitle)
  await p.clickDeleteNoteBtn(secondNoteTitle)
  await p.dontExpectTitle(firstNoteTitle)
  await p.dontExpectTitle(secondNoteTitle)
});

test("Add two notes, archive one of them, then unarchive it", async () => {
  const firstNoteTitle = 'First Note'
  const secondNoteTitle = 'Second Note'
  await p.clickAddNewNoteBtn()
  await p.writeNote(firstNoteTitle, 'These are the contents of the first note!')
  await p.clickAddNoteBtn()
  await p.clickAddNewNoteBtn()
  await p.writeNote(secondNoteTitle, 'The first note was edited!')
  await p.clickAddNoteBtn()
  await p.clickArchiveNoteBtn(firstNoteTitle)
  await p.dontExpectTitle(firstNoteTitle)
  await p.expectCorrectTitle(secondNoteTitle)
  await p.clickUnarchiveButton()
  await p.expectCorrectTitle(firstNoteTitle)
  await p.expectCorrectTitle(secondNoteTitle)
});
