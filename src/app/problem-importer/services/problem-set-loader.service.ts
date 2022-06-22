import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { seedData } from '../seed/seed.data';
import { CodeObject } from 'src/model/problem.interface';
import { state } from 'src/state/state';

@Injectable({
  providedIn: 'root',
})
export class ProblemSetLoaderService {
  allFiles$: BehaviorSubject<string[]>;
  allProblems$: BehaviorSubject<CodeObject[]>;
  private dirname = 'problem-sets';


  constructor() {
    this.allProblems$ = new BehaviorSubject([]);
    this.allFiles$ = new BehaviorSubject([]);
    this.scanForFiles();
  }

  async scanForFiles() {
    if (! await this.verifyIfExists(this.dirname)) {
      await this.seed();
    }
    const filenames = (await Filesystem.readdir({path: this.dirname, directory: Directory.Data})).files;
    this.allFiles$.next(filenames.map(f => f.replace('.json', '')).sort());
  }

  async selectProblemSet(name) {
    const f = await Filesystem.readFile({
      path: `${this.dirname}/${name}.json`,
      directory: Directory.Data,
      encoding: Encoding.UTF8
    });

    const data = JSON.parse(f.data);
    this.allProblems$.next(data.codeObjects);
    state.codeObjects = data.codeObjects;
  }

  async persistProblemset(name: string, data: any) {
    await Filesystem.writeFile({
      path: `${this.dirname}/${name}.json`,
      data: JSON.stringify(data),
      directory: Directory.Data,
      encoding: Encoding.UTF8,
      recursive: false
    });
    this.scanForFiles();
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

  private async seed() {
    const dir = await Filesystem.mkdir({ path: this.dirname, recursive: true, directory: Directory.Data });
    for (const x of seedData) {
      await Filesystem.writeFile({
        path: `${this.dirname}/${x.filename}.json`,
        data: x.content,
        directory: Directory.Data,
        encoding: Encoding.UTF8,
        recursive: false
      });
    }
  }

}
