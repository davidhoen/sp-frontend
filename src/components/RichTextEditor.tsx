export interface EditorProps {
    initialValue?: string;
    onChange?: (content: string) => void;
    height?: number;
    disabled?: boolean;
    placeholder?: string;
}

// components/TinyMCEEditor.tsx
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import dynamic from 'next/dynamic';
import type { Editor as TinyMCEEditorType } from 'tinymce';

const TinyMCEEditor = dynamic(
    () => import('@tinymce/tinymce-react').then(mod => mod.Editor),
    {
        ssr: false,
        loading: () => <p>Loading editor...</p>
    }
);

const RichTextEditor: React.FC<EditorProps> = ({ initialValue = '', onChange, height = 500, disabled = false, placeholder }) => {
    const editorRef = useRef<TinyMCEEditorType | null>(null);

    const handleEditorChange = (content: string, editor: TinyMCEEditorType) => {
        if (onChange) {
            onChange(content);
        }
    };

    const handleInit = (evt: any, editor: TinyMCEEditorType) => {
        editorRef.current = editor;
    };

    return (
        <TinyMCEEditor
            apiKey={process.env.TINYMCE_API_KEY}
            onInit={handleInit}
            initialValue={initialValue}
            disabled={disabled}
            onEditorChange={handleEditorChange}
            init={{
                height,
                menubar: false,
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'charmap',
                    'searchreplace', 'code', 'fullscreen',
                    'insertdatetime', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: [
                    'undo redo | formatselect | bold italic underline strikethrough | forecolor backcolor |',
                    'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |',
                    'removeformat | help'
                ].join(' '),
                content_style: `
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            font-size: 16px;
            line-height: 1.5;
            margin: 1rem;
          }
        `,
                placeholder: placeholder,
                statusbar: true,
                min_height: 300,
                max_height: 800,
                autoresize_bottom_margin: 50,
                branding: false,
            }}
        />
    );
};

export default RichTextEditor;