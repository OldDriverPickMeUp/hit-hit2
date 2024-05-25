import React, { useState, useEffect, useRef } from "react";

function EditableNumber({ number, onChange }) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(number);
  useEffect(() => {
    if (editing) return;
    setEditValue(number);
    // eslint-disable-next-line
  }, [number]);

  const inputRef = useRef();

  return (
    <div>
      <input
        ref={inputRef}
        type="input"
        className="appearance-none focus:outline-none  w-full focus:bg-blue-400 text-center "
        onFocus={() => setEditing(true)}
        value={editing ? editValue : number}
        onBlur={() => {
          let intValue = editValue;
          if (intValue > 300) {
            intValue = 300;
          }
          if (intValue < 20) {
            intValue = 20;
          }
          onChange(intValue);
          setEditing(false);
        }}
        onChange={e => {
          const { value } = e.target;
          let intValue = parseInt(value);
          if (value === "") intValue = 0;
          if (isNaN(intValue)) return;
          setEditValue(intValue);
        }}
        onKeyDown={e => {
          if (e.key !== "Enter") return;
          inputRef.current && inputRef.current.blur();
        }}
      />
    </div>
  );
}

export default EditableNumber;
