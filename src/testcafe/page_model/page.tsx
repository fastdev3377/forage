import { t, Selector, ClientFunction } from "testcafe";

class Page {
  unarchiveBtn: Selector
  addNewNoteBtn: Selector
  addNoteBtn: Selector
  title: Selector
  content: Selector

  constructor() {
    this.unarchiveBtn = Selector('#unarchive-button')
    this.addNewNoteBtn = Selector('#add-new-note-button')
    this.addNoteBtn = Selector('#add-note-button')
    this.title = Selector('#title')
    this.content = Selector('#content')
  }

  async resetLocalStorage() {
    ClientFunction(() => window.localStorage.setItem('notes', JSON.stringify([])));
  }

  async clickUnarchiveButton() {
    await t.click(this.unarchiveBtn)
  }

  async clickAddNewNoteBtn() {
    await t.click(this.addNewNoteBtn)
  }

  async writeNote(
    title: string,
    content: string
  ) {
    await t.typeText(this.title, title, { replace: true })
    await t.typeText(this.content, content, { replace: true })
  }

  async clickAddNoteBtn() {
    await t.click(this.addNoteBtn)
  }

  async clickEditNoteBtn(noteTitle: string) {
    await t.click(`[test-id="edit-button-${noteTitle}"]`)
  }

  async clickArchiveNoteBtn(noteTitle: string) {
    await t.click(`[test-id="archive-button-${noteTitle}"]`)
  }

  async clickDeleteNoteBtn(noteTitle: string) {
    await t.click(`[test-id="delete-button-${noteTitle}"]`)
  }

  async expectCorrectTitle(
    expectedTitle: string
  ) {
    const titleDiv = Selector("div").withText(expectedTitle);
    await t.expect(titleDiv.exists).ok();
  }

  async dontExpectTitle(
    expectedTitle: string
  ) {
    const titleDiv = Selector("div").withText(expectedTitle);
    await t.expect(titleDiv.exists).notOk();
  }
}

export default Page;
