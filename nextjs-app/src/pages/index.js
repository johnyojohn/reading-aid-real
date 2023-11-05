import { useState } from "react";
import TextEditor from "../components/TextEditor";
import ReadingMode from "../components/ReadingMode";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";

import { generateJSON } from "@tiptap/html";

export default function Home() {
  const [text, setText] = useState("");
  const [submittedText, setSubmittedText] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [jsonContent, setJsonContent] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false); // New state to track submission
  const [mode, setMode] = useState("reading"); // 'reading' or 'edit'

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedText(text);
    setHtmlContent("<p>" + text + "</p>");
    setJsonContent(
      generateJSON("<p>" + text + "</p>", [Document, Paragraph, Text])
    );
    setIsSubmitted(true); // Set to true upon submission
    setMode("edit"); // Switch to edit mode immediately after submitting
  };

  const toggleMode = () => {
    setMode(mode === "reading" ? "edit" : "reading");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start">
      <h1 className="text-4xl font-bold mb-6 mt-20">Reading Aid Web App</h1>
      {!isSubmitted && ( // Only show the form if the text has not been submitted. Also, we might want to handle nonstring inputs and whitespace and stuff in the form.
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <textarea
            className="w-full px-3 py-2 bg-white shadow-sm overflow-y-auto  focus:outline-none"
            rows="10"
            placeholder="Paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      )}
      {isSubmitted && (
        <div className="">
          <div className="flex flex-row items-center justify-center">
            <h4 className="mr-2 text-lg font-normal">Toggle to change from </h4>
            <button
              onClick={toggleMode}
              className={`mt-4 px-6 py-2 mb-4 ${
                mode === "reading"
                  ? "bg-green-400 hover:bg-green-500"
                  : "bg-yellow-400 hover:bg-yellow-500"
              } text-white rounded-lg`}
            >
              {mode === "edit" ? "Edit" : "Reading"} Mode
            </button>
          </div>
          <div className="flex flex-col items-center min-w-[36rem] w-full">
            {mode === "edit" && (
              <TextEditor
                content={jsonContent}
                setTextContent={setSubmittedText}
                setHtmlContent={setHtmlContent}
                setJsonContent={setJsonContent}
              />
            )}
            {mode === "reading" && <ReadingMode jsonContent={jsonContent} />}
            {/* Here you would conditionally render the reading aid tools based on the mode */}
          </div>
        </div>
      )}
    </div>
  );
}
