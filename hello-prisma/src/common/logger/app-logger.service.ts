import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AppLoggerService {
  private readonly logPath = path.join(
    process.cwd(),
    'logs',
    'app.log',
  );

  private write(message: string): void {
    const logDir = path.dirname(this.logPath);

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    fs.appendFileSync(
      this.logPath,
      `${new Date().toISOString()} ${message}\n`,
    );
  }

create(module: string, data: unknown): void {
  try {
    const logPath = path.join(process.cwd(), 'logs', `${module.toLowerCase()}.log`);
    const logDir = path.dirname(logPath);

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    fs.appendFileSync(logPath, `${new Date().toISOString()} [CREATE] ${JSON.stringify(data)}\n`);
    console.log('LOG SUCCESS:', logPath);
  } catch (error) {
    console.error('LOG ERROR:', error);
  }
}

update(module: string, oldData: unknown, newData: unknown): void {
  try {
    const logPath = path.join(process.cwd(), 'logs', `${module.toLowerCase()}.log`);
    const logDir = path.dirname(logPath);

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    fs.appendFileSync(
      logPath,
      `${new Date().toISOString()} [UPDATE] OLD: ${JSON.stringify(oldData)} | NEW: ${JSON.stringify(newData)}\n`,
    );
    console.log('LOG SUCCESS:', logPath);
  } catch (error) {
    console.error('LOG ERROR:', error);
  }
}

  delete(module: string, data: unknown): void {
  try {
    const logPath = path.join(process.cwd(), 'logs', `${module.toLowerCase()}.log`);
    const logDir = path.dirname(logPath);

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    fs.appendFileSync(
      logPath,
      `${new Date().toISOString()} [DELETE] ${JSON.stringify(data)}\n`,
    );
    console.log('LOG SUCCESS:', logPath);
  } catch (error) {
    console.error('LOG ERROR:', error);
  }
}
}