import React, { useState, useRef, useMemo, useCallback } from 'react';
import JoditEditor from 'jodit-react';

export function DaEditor({ placeholder, onDropItem }) {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [templateName, setTemplateName] = useState('');
  const [templateId, setTemplateId] = useState('');
  const [jsonContent, setJsonContent] = useState(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || 'Start typing...',
      textAlign: 'right',
      buttons:
        'source,|,bold,italic,underline,strikethrough,|,superscript,subscript,|,ul,ol,|,outdent,indent,|,font,fontsize,brush,paragraph,|,link,unlink,|,align,undo,redo,selectall,|,hr,symbol,fullsize,print,about,|,image,video,file,table,table|',
      uploader: {
        url: '/tu-endpoint-de-subida-de-imagenes',
        insertImageAsBase64URI: true,
        format: 'json',
        process: (response) => {
          return {
            files: [response.data.url],
          };
        },
      },
      events: {
        beforeRemoveImage: (image) => {
          if (window.confirm('¿Seguro que deseas eliminar esta imagen?')) {
            image.remove();
          }
        },
      },
    }),
    [placeholder]
  );

  const handleGenerateJSON = () => {
    const template = {
      id: templateId || 'empty-guid',
      name: templateName,
      content: content,
    };
    console.log('JSON formate message:');
    console.log(JSON.stringify(template, null, 2));
    setJsonContent(template);
  };

  const handleExtractHTML = () => {
    const htmlContent = content; // Obtén el contenido HTML del editor
    console.log('HTML format message:');
    console.log(htmlContent);
  };

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      const droppedItem = e.dataTransfer.getData('text/plain');
      onDropItem(droppedItem);
    },
    [onDropItem]
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <div onDrop={handleDrop} onDragOver={handleDragOver} style={{ border: '2px dashed #ccc', padding: '16px' }}>
      <div>
        <input
          type="text"
          placeholder="Template Name"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
        />
        <input
          type="text"
          placeholder="ID"
          value={templateId}
          onChange={(e) => setTemplateId(e.target.value)}
        />
        <button onClick={handleGenerateJSON}>JSON Message</button>
        <button onClick={handleExtractHTML}>HTML Message</button>
      </div>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1}
        onBlur={(newContent) => setContent(newContent)}
        onChange={(newContent) => {}}
      />
      {content}
    </div>
  );
}
