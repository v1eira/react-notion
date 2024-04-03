import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { initialContent } from './initialContent'
import { createLowlight } from 'lowlight'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import js from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/tokyo-night-dark.css'
import { RxFontBold, RxFontItalic, RxStrikethrough, RxCode, RxChevronDown, RxChatBubble } from 'react-icons/rx'
import { BubbleButton } from './BubbleButton'
import { FloatingButton } from './FloatingButton'
import { EditorState } from '@tiptap/pm/state'

const lowlight = createLowlight()
lowlight.register({js})

export function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight,
      })
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: 'outline-none',
      },
    }
  })

  const shouldShowFloatingMenu = (state: EditorState) => {
    const { $from } = state.selection
    const currentLineText = $from.nodeBefore?.textContent

    return currentLineText === "/"
  }

  return (
    <>
      <EditorContent
        className="max-w-[700px] mx-auto pt-16 prose prose-invert prose-purple"
        editor={editor}
      />
      {editor && (
        <FloatingMenu
          editor={editor}
          className="bg-zinc-700 py-2 px-1 shadow-xl border gap-1 border-zinc-600 shadow-black/20 rounded-lg overflow-hidden flex flex-col"
          shouldShow={({ state }) => shouldShowFloatingMenu(state)}
        >
          <FloatingButton
            imgURL="http://www.notion.so/images/blocks/text/en-US.png"
            name="Text"
            description="Just start writing with plain text."
          />

          <FloatingButton
            imgURL="http://www.notion.so/images/blocks/header.57a7576a.png"
            name="Heading 1"
            description="Big section heading."
            onClick={() => editor.chain().focus().toggleHeading({ level: 1}).run()}
          />
        </FloatingMenu>
      )}
      {editor && (
        <BubbleMenu className="bg-zinc-700 shadow-xl border border-zinc-600 shadow-black/20 rounded-lg overflow-hidden flex divide-x divide-zinc-600" editor={editor}>
          <BubbleButton>
            Text
            <RxChevronDown className="w-4 h-4" />
          </BubbleButton>
          <BubbleButton>
            <RxChatBubble className="w-4 h-4" />
            Comment
          </BubbleButton>
          <div className="flex items-center">
            <BubbleButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              data-active={editor.isActive("bold")}
            >
              <RxFontBold className="w-4 h-4"/>
            </BubbleButton>
            <BubbleButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              data-active={editor.isActive("italic")}
            >
              <RxFontItalic className="w-4 h-4"/>
            </BubbleButton>
            <BubbleButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              data-active={editor.isActive("strike")}
            >
              <RxStrikethrough className="w-4 h-4"/>
            </BubbleButton>
            <BubbleButton
              onClick={() => editor.chain().focus().toggleCode().run()}
              data-active={editor.isActive("code")}
            >
              <RxCode className="w-4 h-4"/>
            </BubbleButton>
          </div>
        </BubbleMenu>
      )}
    </>
  )
}