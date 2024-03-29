import { create } from 'zustand'

export const useDrawerStore = create((set) => ({
    drawerTestament: 'OLD',
    drawerBook: null,
    drawerBookName: null,
    drawerChapter: null,
    drawerMaxChapter: null,
    setDrawerTestament: (testament) => set({ drawerTestament: testament }),
    setDrawerBook: (book) => set({ drawerBook: book }),
    setDrawerBookName: (bookName => set({drawerBookName: bookName})),
    setDrawerChapter: (chapter) => set({ drawerChapter: chapter }),
    setDrawerMaxChapter: (maxChapter) => set({ drawerMaxChapter: maxChapter }),
    resetDrawerStore: () => {
        set({
            drawerTestament: 'OLD',
            drawerBook: null,
            drawerChapter: null,
            drawerMaxChapter: null,
        });
    },


}))