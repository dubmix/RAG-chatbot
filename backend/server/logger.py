import logging

GREEN = '\033[92m'
YELLOW = '\033[93m'
RESET_PRINT = '\033[0m'

class ColoredLogs(logging.StreamHandler):
    def emit(self, record):
        msg = self.format(record)
        if record.levelno == logging.INFO:
            msg = f"{GREEN}{msg}{RESET_PRINT}"
        if record.levelno == logging.DEBUG:
            msg = f"{YELLOW}{msg}{RESET_PRINT}"
        print(msg)

logging.basicConfig(
    format='%(asctime)s - %(filename)s - %(levelname)s - %(message)s',
    level=logging.INFO,
    handlers=[ColoredLogs()]
)
logger = logging.getLogger(__name__)