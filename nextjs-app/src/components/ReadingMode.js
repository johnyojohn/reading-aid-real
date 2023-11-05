import React, { useState, useEffect } from "react";
import StarterKit from "@tiptap/starter-kit";
import "@tiptap/extension-text-style";

// Import necessary extensions
import { useEditor, EditorContent } from "@tiptap/react";
import TextStyle from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import FontFamily from "@tiptap/extension-font-family";
import Color from "@tiptap/extension-color";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Italic from "@tiptap/extension-italic";

const ReadingMode = ({ jsonContent }) => {
  const [identifiedElements, setIdentifiedElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);

  // Initialize TipTap editor in read-only mode
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Highlight.configure({ multicolor: true }),
      FontFamily,
      Color,
    ],
    content: jsonContent,
    editable: false,
  });

  useEffect(() => {
    // Fetch the identified elements and their tooltip data from the API
    // For now, we'll use dummy data

    const dummyData = {
      identified_elements: [
        { text: "HTTP", tooltipData: "Hypertext Transfer Protocol" },
        {
          text: "Vercel",
          tooltipData:
            "A cloud platform for static sites and Serverless Functions",
        },
        {
          text: "Dummy data",
          tooltipData: "more dummy data",
        },
        // ... more elements
      ],
    };
    setIdentifiedElements(dummyData.identified_elements);
  }, []);

  // Ensure the editor is destroyed properly
  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  const handleElementClick = (element) => {
    setSelectedElement(element);
    // Highlight the text in the editor
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="flex">
      <div className="flex-1 w-full max-h-[60vh] max-w-xl min-w-[36rem] overflow-y-auto focus:outline-none">
        <EditorContent
          editor={editor}
          className="px-3 py-2 bg-white shadow-lg overflow-y-auto focus:outline-none"
        />
      </div>
      <div className="w-64 h-[60vh] overflow-y-auto bg-gray-100 border-l">
        <div className="p-4">
          <h2 className="font-bold mb-2">Identified Elements</h2>
          <ul>
            {identifiedElements.map((element) => (
              <li key={element.text} className="mb-1">
                <button
                  className="w-full text-left cursor-pointer hover:bg-gray-200 p-2 rounded"
                  onClick={() => handleElementClick(element)}
                >
                  {element.text}
                </button>
                {selectedElement?.text === element.text && (
                  <div className="p-2 bg-white rounded shadow">
                    <p>{element.tooltipData}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReadingMode;

// import React, { useState, useEffect } from "react";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import { Tooltip as ReactTooltip } from "react-tooltip";

// import Bold from "@tiptap/extension-bold";
// import Document from "@tiptap/extension-document";
// import Paragraph from "@tiptap/extension-paragraph";
// import Text from "@tiptap/extension-text";

// import TextStyle from "@tiptap/extension-text-style";
// import Highlight from "@tiptap/extension-highlight";
// import FontFamily from "@tiptap/extension-font-family";
// import Color from "@tiptap/extension-color";
// import Italic from "@tiptap/extension-italic";

// const ReadingMode = ({ jsonContent }) => {
//   const [isHighlightActive, setIsHighlightActive] = useState(false);
//   const [identifiedElements, setIdentifiedElements] = useState([]);
//   const [tooltipsData, setTooltipsData] = useState({});
//   const [htmlContent, setHtmlContent] = useState("");

//   // Initialize TipTap editor in read-only mode
//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       TextStyle,
//       Bold,
//       Document,
//       Paragraph,
//       Text,
//       Italic,
//       Highlight.configure({ multicolor: true }),
//       FontFamily,
//       Color,
//     ],
//     content: jsonContent,
//     editable: false,
//   });
//   useEffect(() => {
//     if (editor) {
//       const currentHtmlContent = editor.getHTML();
//       setHtmlContent(currentHtmlContent);
//       console.log(htmlContent);
//     }
//   }, [editor, jsonContent]);

//   useEffect(() => {
//     // Fetch the identified elements and their tooltip data from the API
//     // For now, we'll use dummy data
//     const dummyData = {
//       identified_elements: [
//         { text: "HTTP", tooltipData: "Hypertext Transfer Protocol" },
//         {
//           text: "Vercel",
//           tooltipData:
//             "A cloud platform for static sites and Serverless Functions",
//         },
//         // ... more elements
//       ],
//     };
//     setIdentifiedElements(dummyData.identified_elements);
//     // Convert array to object for easy access
//     const tooltipDataObj = {};
//     dummyData.identified_elements.forEach((item) => {
//       tooltipDataObj[item.text] = item.tooltipData;
//     });
//     setTooltipsData(tooltipDataObj);
//   }, []);

//   const toggleHighlight = () => {
//     setIsHighlightActive(!isHighlightActive);
//   };

//   // Ensure the editor is destroyed properly
//   useEffect(() => {
//     return () => {
//       editor?.destroy();
//     };
//   }, [editor]);

//   if (!editor) {
//     return null;
//   }

//   return (
//     <div className="w-full max-h-[60vh] max-w-xl min-w-[36rem] overflow-y-auto focus:outline-none">
//       <button onClick={toggleHighlight} className="toggle-highlight-btn">
//         {isHighlightActive ? "Hide" : "Show"} Highlights
//       </button>
//       <EditorContent
//         editor={editor}
//         className="px-3 py-2 bg-white shadow-lg overflow-y-auto  focus:outline-none"
//       />
//       {isHighlightActive &&
//         identifiedElements.map((element) => (
//           <ReactTooltip
//             id={element.text}
//             key={element.text}
//             place="top"
//             effect="solid"
//             backgroundColor="#FFF"
//             textColor="#000"
//             border={true}
//             borderColor="#DDD"
//           >
//             {tooltipsData[element.text]}
//             <button
//               className="close-tooltip"
//               onClick={() => ReactTooltip.hide()}
//             >
//               Close
//             </button>
//           </ReactTooltip>
//         ))}
//     </div>
//   );
// };

// export default ReadingMode;
