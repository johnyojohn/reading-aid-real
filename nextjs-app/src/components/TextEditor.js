import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import FontFamily from "@tiptap/extension-font-family";
import Color from "@tiptap/extension-color";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Italic from "@tiptap/extension-italic";

import Toolbar from "./Toolbar";
import React from "react";
import { HtmlContext } from "next/dist/shared/lib/html-context.shared-runtime";
const { convert } = require("html-to-text");

const TextEditor = ({
  content,
  setTextContent,
  setHtmlContent,
  setJsonContent,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Highlight.configure({ multicolor: true }),
      FontFamily,
      Color,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      setHtmlContent(editor.getHTML());
      console.log(editor.getHTML());
      setTextContent(
        convert(editor.getHTML(), { wordwrap: false, preserveNewlines: true })
      );
      setJsonContent(editor.getJSON());
    },
  });

  return (
    <div className="">
      <div className="w-full max-w-xl min-w-[36rem]">
        <Toolbar editor={editor} />
      </div>
      <div className="w-full max-h-[60vh] max-w-xl min-w-[36rem] overflow-y-auto focus:outline-none">
        <EditorContent
          editor={editor}
          className="px-3 py-2 bg-white shadow-lg overflow-y-auto  focus:outline-none"
        />
      </div>
    </div>
  );
};

export default TextEditor;
