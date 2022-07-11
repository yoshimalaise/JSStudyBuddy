import { Injectable } from '@angular/core';
import { Exercise } from 'src/model/exercise.interface';
import { UserEntry } from 'src/model/user-statistics.interface';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { ExerciseGeneratorService } from './exercise-generator.service';
import { ProblemSetLoaderService } from 'src/app/problem-importer/services/problem-set-loader.service';

@Injectable({
  providedIn: 'root'
})
export class UserStatisticsService {
  entries: UserEntry[] = [];
  private dirname = 'user-stats';

  constructor(private exService: ExerciseGeneratorService, private problemSetService: ProblemSetLoaderService) {
    this.load();
   }

  async addLog(ex: Exercise, duration: string) {
    this.entries.push({
      exercise: ex,
      duration,
      timestamp: new Date()
    });
    await this.persist();
    const codeObj = this.exService.currCodeObject;
    if (codeObj.leitner_box < 5) {
      codeObj.leitner_box++;
    }
    await this.problemSetService.persistCurrent();
  }

  getEntriesFromToday(): UserEntry[] {
    const todayStr = (new Date()).toISOString().split('T')[0];
    return this.entries.filter(e => e.timestamp.toISOString().split('T')[0] === todayStr);
  }

  /**
   * returns total playtime in number of seconds
   */
  getTotalPlaytime(): number {
    return this.entries.map(entry => {
      const parts = entry.duration.split(':');
      const min = parseInt(parts[1], 10);
      const sec = parseInt(parts[0], 10);
      return (min * 60) + sec;
    }).reduce((acc, current) => acc + current, 0);
  }

  private async load() {
    if (!this.verifyIfExists(this.dirname)) {
      const dir = await Filesystem.mkdir({ path: this.dirname, recursive: true, directory: Directory.Data });
      await this.persist();
    }

    const f = await Filesystem.readFile({
      path: `${this.dirname}/user-stats.json`,
      directory: Directory.Data,
      encoding: Encoding.UTF8
    });

    const data = JSON.parse(f.data);
    this.entries = data.entries.map(e => ({...e, timestamp: new Date(e.timestamp)}));
  }

  private async persist() {
      await Filesystem.writeFile({
        path: `${this.dirname}/user-stats.json`,
        data: JSON.stringify({entries: this.entries}),
        directory: Directory.Data,
        encoding: Encoding.UTF8,
        recursive: true
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
