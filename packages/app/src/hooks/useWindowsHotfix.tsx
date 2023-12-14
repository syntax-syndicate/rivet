import { useEffect } from 'react';
import { type MenuIds, useRunMenuCommand } from './useMenuCommands';

interface HotfixWindow extends Window {
    __tauri_hotfix?: boolean;
}
declare let window: HotfixWindow;

const isWindowsPlatform = typeof navigator !== 'undefined' && navigator.userAgent.includes('Win64');

if(isWindowsPlatform) {
    console.warn('Hotfix applied for Windows platform');
}

/**
 * Applies a keyboard shortcut hotfix for Windows platform.
 */
export const useWindowsHotfix = () => {
    const runMenuCommandImpl = useRunMenuCommand();

    // @see https://github.com/Ironclad/rivet/issues/261
    useEffect(() => {
        if (typeof window === 'undefined' || !isWindowsPlatform || window.__tauri_hotfix) {
            return;
        }

        const onKeyUp = ({ key, ctrlKey, shiftKey }: KeyboardEvent) => {
            const code = `${ctrlKey ? 'CmdOrCtrl+' : ''}${shiftKey ? 'Shift+' : ''}${key.toUpperCase()}`;
            const codeToMenuId: Record<string, MenuIds> = {
                F5: 'remote_debugger',
                'CmdOrCtrl+Shift+O': 'load_recording',
                'CmdOrCtrl+N': 'new_project',
                'CmdOrCtrl+O': 'open_project',
                'CmdOrCtrl+S': 'save_project',
                'CmdOrCtrl+Shift+E': 'export_graph',
                'CmdOrCtrl+Shift+I': 'import_graph',
                'CmdOrCtrl+Shift+S': 'save_project_as',
                'CmdOrCtrl+ENTER': 'run',
            };
            if (codeToMenuId[code]) {
                console.warn(`Hotfix: ${code} -> ${codeToMenuId[code]}`);
                runMenuCommandImpl(codeToMenuId[code]!);
            }
        };

        window.__tauri_hotfix = true; // protects against double usage of hook by mistake
        window.addEventListener('keyup', onKeyUp);

        return () => {
            window.removeEventListener('keyup', onKeyUp);
            window.__tauri_hotfix = false;
        };
    }, [runMenuCommandImpl]);

    return isWindowsPlatform;
};
