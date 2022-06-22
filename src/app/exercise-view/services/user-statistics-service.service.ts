import { Injectable } from '@angular/core';
import { Exercise } from 'src/model/exercise.interface';
import { UserEntry } from 'src/model/user-statistics.interface';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class UserStatisticsService {
  private entries: UserEntry[] = [];
  private dirname = 'user-stats';

  constructor() {
    this.load();
   }

  async addLog(ex: Exercise, duration: string) {
    this.entries.push({
      exercise: ex,
      duration,
      timestamp: new Date()
    });
    this.persist();
  }

  private async load() {
    if (!this.verifyIfExists(this.dirname)) {
      const dir = await Filesystem.mkdir({ path: this.dirname, recursive: true, directory: Directory.Data });
    }

    const f = await Filesystem.readFile({
      path: `${this.dirname}/user-stats.json`,
      directory: Directory.Data,
      encoding: Encoding.UTF8
    });

    const data = JSON.parse(f.data);
    this.entries = data.entries;
  }

  private async persist() {
      await Filesystem.writeFile({
        path: `${this.dirname}/user-stats.json`,
        data: JSON.stringify({entries: this.entries}),
        directory: Directory.Data,
        encoding: Encoding.UTF8,
        recursive: false
      });
  }

  private async verifyIfExists(dirname) {
    try {
      const ret = await Filesystem.readdir({
        path: '/',
        directory: Directory.Data
      });
      return ret.files.includes(dirname);
    }
    catch(e) {
      console.log('Unable to read dir: ' + e);
      return false;
    }
  }
}
