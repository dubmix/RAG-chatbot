import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parent.parent))


def pytest_runtest_logreport(report):
    if report.when == "call" and report.passed:
        if hasattr(report, "capstdout"):
            stdout = report.capstdout
            if stdout:
                print("\033[1;33m\n\nSTDOUT:\033[0m")
                print(f"\033[1;33m\n{stdout}\033[0m")
