import React from 'react';
import AddNoteComponent from "../../components/Note/AddNoteComponent/AddNoteComponent.jsx";
import BackButtonBar from "../../components/Layout/BackButtonBar/BackButtonBar.jsx";

const AddNote = () => {
    return (
        <div>
            <BackButtonBar />
            <AddNoteComponent />
        </div>
    );
};

export default AddNote;