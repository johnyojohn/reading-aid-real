import { Popover } from "@headlessui/react";
import { Fragment, useState } from "react";

const ColorPickerPopover = (props) => {
  const [color, setColor] = useState("#000000");
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

  const applyColor = (newColor) => {
    setColor(newColor);
    if (props.f_or_h == "h") {
      props.editor.chain().focus().setHighlight({ color: newColor }).run();
    } else {
      props.editor.chain().focus().setColor(newColor).run();
    }
  };

  return (
    <Popover as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <Popover.Button as={Fragment}>
            {({ open }) => (
              <button
                className={`px-2 py-1 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 ${
                  open ? "bg-gray-100" : ""
                }`}
              >
                {props.f_or_h == "f" ? "Font Color" : "Highlight"}
              </button>
            )}
          </Popover.Button>

          <Popover.Panel className="absolute z-10 w-52 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="p-3 grid grid-cols-4 gap-2">
              {mostUsedColors.map((presetColor) => (
                <button
                  key={presetColor}
                  className="w-6 h-6 rounded-full border border-gray-300"
                  style={{ backgroundColor: presetColor }}
                  onClick={() => applyColor(presetColor)}
                  aria-label={`Color ${presetColor}`}
                />
              ))}
              <div className="col-span-4 mt-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => applyColor(e.target.value)}
                  className="w-full h-8 border-gray-300 rounded-md cursor-pointer"
                  aria-label="Custom color picker"
                />
              </div>
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};

export default ColorPickerPopover;
