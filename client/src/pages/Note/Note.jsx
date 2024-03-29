import React from 'react';
import NoteComponent from "../../components/Note/NoteComponent/NoteComponent.jsx";
import BackButtonBar from "../../components/Layout/BackButtonBar/BackButtonBar.jsx";

const Note = () => {
    return (
        <div>
            <BackButtonBar />
            <NoteComponent />
        </div>
    );
};

export default Note;