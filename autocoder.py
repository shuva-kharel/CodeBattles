import os
import time
import random
import psutil
import subprocess
from datetime import datetime
import pyautogui

# Configuration
VSCODE_PATH = "code"  # Assumes 'code' is in PATH
WORKSPACE_DIR = os.getcwd()
FILE_PREFIX = "autocode_"
CHECK_INTERVAL = 60  # Check VS Code every 60 seconds
SENTENCES = (
    "Lorem ipsum dolor sit amet consectetur adipiscing elit",
    "sed do eiusmod tempor incididunt ut labore et dolore",
    "magna aliqua Ut enim ad minim veniam quis nostrud",
    "exercitation ullamco laboris nisi ut aliquip ex ea",
) * 3  # More variation

def log_message(msg):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    full_msg = f"[{timestamp}] {msg}"

    # Print to console
    print(full_msg)

    # Append to log.txt
    try:
        with open("log.txt", "a", encoding="utf-8") as log_file:
            log_file.write(full_msg + "\n")
    except Exception as e:
        print(f"[{timestamp}] Logging to file failed: {e}")


def is_vscode_running():
    try:
        # On Windows, process may be "Code.exe" or "Code - OSS.exe"
        for p in psutil.process_iter(['name']):
            name = p.info['name']
            if name and 'Code' in name:
                return True
        return False
    except Exception as e:
        log_message(f"Process check error: {str(e)}")
        return False

def launch_vscode_with_new_file():
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"{FILE_PREFIX}{timestamp}.py"
    filepath = os.path.join(WORKSPACE_DIR, filename)

    # Create empty file
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write("")

    # Launch VS Code with the folder and specific file
    subprocess.Popen([VSCODE_PATH, WORKSPACE_DIR, '-g', filepath], shell=True)
    log_message(f"Launched VS Code in folder mode with {filename}")

    time.sleep(10)  # Give VS Code more time to open

    # Bring VS Code to foreground if possible
    try:
        time.sleep(2)
        windows = pyautogui.getWindowsWithTitle("Visual Studio Code")
        if windows:
            windows[0].activate()
            time.sleep(1)
    except Exception as e:
        log_message(f"Window activation failed: {str(e)}")

    return filepath

def type_random_content():
    try:
        # Type multiple lines with natural pauses and explicit enters
        line_count = random.randint(5, 15)
        for _ in range(line_count):
            line = random.choice(SENTENCES)
            pyautogui.write(line, interval=0.2)  # slower typing
            pyautogui.press('enter')  # explicit newline
            time.sleep(random.uniform(1, 3))  # natural pause

        # Save the file (Ctrl+S)
        pyautogui.hotkey('ctrl', 's')
        pyautogui.hotkey('enter')
        log_message(f"Typed {line_count} lines and saved.")
        time.sleep(1)

    except Exception as e:
        log_message(f"Typing error: {str(e)}")

def monitor_and_recover():
    last_check = 0
    while True:
        try:
            current_time = time.time()

            # Check VS Code status every CHECK_INTERVAL seconds without blocking typing
            if current_time - last_check > CHECK_INTERVAL:
                if not is_vscode_running():
                    log_message("VS Code not running - attempting recovery...")
                    filepath = launch_vscode_with_new_file()
                    log_message(f"Created new file: {filepath}")
                    # Reset last_check after recovery to avoid spamming
                    last_check = current_time
                else:
                    last_check = current_time

            # Normal typing operation
            type_random_content()

            # Random delay between typing sessions (30 to 90 seconds)
            delay = random.randint(30, 40)
            log_message(f"Next action in {delay} seconds...")
            time.sleep(delay)

        except KeyboardInterrupt:
            log_message("Stopped by user")
            break
        except Exception as e:
            log_message(f"Error in main loop: {str(e)}")
            time.sleep(10)

if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    log_message("Auto Coder started")

    # Initial launch if VS Code isn't running
    if not is_vscode_running():
        filepath = launch_vscode_with_new_file()
        log_message(f"Initial launch created: {filepath}")
        time.sleep(5)

    monitor_and_recover()