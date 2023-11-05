import React from "react";
import ColorPickerPopover from "./ColorPickerPopover";

const Toolbar = ({ editor }) => {
  if (!editor) {
    return null;
  }
  const mostUsedColors = [
    "#000000", // Black
    "#FFFFFF", // White
    "#FF0000", // Red
    "#00FF00", // Green
    "#0000FF", // Blue
    "#FFFF00", // Yellow
    "#00FFFF", // Cyan
    "#FF00FF", // Magenta
  ];

  return (
    <div className="flex gap-2 mb-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={
          editor.isActive("bold")
            ? "bg-slate-200 rounded-md border border-gray-300 shadow-sm px-2 py-1 hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
            : "bg-white rounded-md border border-gray-300 shadow-sm px-2 py-1 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
        }
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={
          editor.isActive("italic")
            ? "bg-slate-200 rounded-md border border-gray-300 shadow-sm px-2 py-1 hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
            : "bg-white rounded-md border border-gray-300 shadow-sm px-2 py-1 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
        }
      >
        Italic
      </button>

      <ColorPickerPopover editor={editor} f_or_h={"f"} />
      <ColorPickerPopover editor={editor} f_or_h={"h"} />

      <select
        onChange={(e) =>
          editor.chain().focus().setFontFamily(e.target.value).run()
        }
        className="border rounded"
      >
        <option value="">Default</option>
        <option value="Arial">Arial</option>
        <option value="Georgia">Georgia</option>
        <option value="Helvetica">Helvetica</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Comic Sans MS">Comic Sans MS</option>
      </select>
    </div>
  );
};

export default Toolbar;
