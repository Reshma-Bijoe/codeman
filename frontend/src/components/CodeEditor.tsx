
import React, { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
}

const CodeEditor = ({ value, onChange, language = 'python' }: CodeEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const monacoEditorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      const editor = monaco.editor.create(editorRef.current, {
        value,
        language,
        theme: 'vs-light',
        automaticLayout: true,
        minimap: {
          enabled: false,
        },
        scrollBeyondLastLine: false,
        fontFamily: 'Menlo, Monaco, "Courier New", monospace',
        fontSize: 14,
        lineNumbers: 'on',
        renderLineHighlight: 'all',
        roundedSelection: true,
        scrollbar: {
          verticalScrollbarSize: 12,
          horizontalScrollbarSize: 12,
        },
      });

      editor.onDidChangeModelContent(() => {
        onChange(editor.getValue());
      });

      monacoEditorRef.current = editor;

      return () => {
        editor.dispose();
      };
    }
  }, []);

  return <div ref={editorRef} className="editor-container"></div>;
};

export default CodeEditor;
