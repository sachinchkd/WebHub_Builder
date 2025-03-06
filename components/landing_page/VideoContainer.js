'use client';

import GrapesJsStudio, {
  StudioCommands,
  ToastVariant,
} from '@grapesjs/studio-sdk/react';
import { useState } from 'react';

import '@grapesjs/studio-sdk/style';

export default function Home() {
  const [editor, setEditor] = useState();

  const onReady = (editor) => {
    console.log('Editor loaded', editor);
    setEditor(editor);
  };

  const showToast = (id) =>
    editor?.runCommand(StudioCommands.toastAdd, {
      id,
      header: 'Toast header',
      content: 'Data logged in console',
      variant: ToastVariant.Info,
    });

  const getProjetData = () => {
    if (editor) {
      console.log({ projectData: editor?.getProjectData() });
      showToast('log-project-data');
    }
  };

  const getExportData = () => {
    if (editor) {
      console.log({ html: editor?.getHtml(), css: editor?.getCss() });
      showToast('log-html-css');
    }
  };
  
 
  return (
    <main className="flex h-screen flex-col justify-between p-5 gap-2">
      <index/>
      <div className="p-1 flex gap-5">
        <div className="font-bold">WebHub Studio</div>
        <button className="border rounded px-2" onClick={getProjetData}>
          Log Project Data
        </button>
        <button className="border rounded px-2" onClick={getExportData}>
          Log HTML/CSS
        </button>
      </div>
      <div className="flex-1 w-full h-full overflow-hidden">
        <GrapesJsStudio
          onReady={onReady}
          options={{
            licenseKey: '9288b413eb9f40728a30256f2502f00260929631643e4d7b8eac2c36bf132450',
            project: {
              default: {
                pages: [
                  {
                    name: 'Home',
                    component: `<h1 style="padding: 2rem; text-align: center">
                      Hello Studio 👋
                    </h1>`,
                  },
                ],
              },
            },
          }}
        />


      </div>
    </main>
  );
}