import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

function MyHtmlEditor() {
  const Example = ({ placeholder }) => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
  
    const config = useMemo(
      {
        readonly: false, // all options from https://xdsoft.net/jodit/docs/,
        placeholder: placeholder || 'Start typings...'
      },
      [placeholder]
    );
  
/*
  useEffect(() => {
    if (editorRef.current) {
      const editor = new Jodit(editorRef.current, {
        // Configuración opcional de Jodit
      });

      // Manejar eventos u otras configuraciones aquí si es necesario

      // Por ejemplo, escuchar cambios en el contenido
      editor.events.on('change', () => {
        // Acceder al contenido HTML
        const htmlContent = editor.value;
        console.log(htmlContent);
      });
    }
  }, []);
*/
	return (
    <>
    <h1>TEST</h1>
		<JoditEditor
			ref={editor}
			value={content}
			config={config}
			tabIndex={1} // tabIndex of textarea
			onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
			onChange={newContent => {}}
		/>

  </>
	);
}




};

export default MyHtmlEditor;