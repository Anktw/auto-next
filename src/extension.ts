import * as vscode from 'vscode';
import { spawn } from 'child_process';
import * as os from 'os';
import * as readline from 'readline';

export function activate(context: vscode.ExtensionContext) {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        vscode.window.showErrorMessage('No folder opened.');
        return;
    }

    const projectPath = workspaceFolders[0].uri.fsPath;

    const devProcess = spawn('npm', ['run', 'dev'], {
        cwd: projectPath,
        shell: true
    });

    const rl = readline.createInterface({
        input: devProcess.stdout,
        output: devProcess.stdin,
        terminal: false
    });

    let opened = false;

    rl.on('line', (line: string) => {
        console.log('[Next.js]', line);

        const match = line.match(/url:\s*(http:\/\/localhost:\d+)/i);
        if (match && !opened) {
            opened = true;
            const url = match[1];
            openInBrowser(url);
        }
    });

    devProcess.stderr.on('data', (data) => {
        console.error(`[stderr]: ${data}`);
    });

    devProcess.on('exit', (code) => {
        console.log(`Next.js dev server exited with code ${code}`);
    });
}

function openInBrowser(url: string) {
    const platform = os.platform();
    let command = '';

    if (platform === 'win32') {
        command = `start ${url}`;
    } else if (platform === 'darwin') {
        command = `open ${url}`;
    } else {
        command = `xdg-open ${url}`;
    }

    const child = spawn(command, { shell: true });
    child.on('error', (err) => {
        vscode.window.showErrorMessage(`Failed to open browser: ${err.message}`);
    });
}

export function deactivate() {}
