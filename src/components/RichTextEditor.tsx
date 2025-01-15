import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { useEffect } from "react";

export default function RichTextEditor({ value, onChange, placeholder }: { value: string, onChange: (value: string) => void, placeholder?: string }) {
    const modules = {
        toolbar: [
            'bold', 'italic', 'underline', 'strike', 'blockquote', { list: 'ordered' }, { list: 'bullet' }, 'link'
        ],
        clipboard: {
            matchVisual: false,
        },
    };
    const formats = ['bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'link'];

    const { quill, quillRef } = useQuill({ theme: "snow", placeholder, formats, modules });

    useEffect(() => {
        if (quill) {
            quill.clipboard.dangerouslyPasteHTML(value || "");
            quill.on('text-change', () => onChange(quill.root.innerHTML));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quill]);

    return (
        <div>
            <div ref={quillRef} />
        </div>
    );
};