import { Injectable } from '@angular/core';
import { Medal, MedalType } from 'src/model/medal.interface';
import { UserStatisticsService } from './user-statistics-service.service';

@Injectable({
  providedIn: 'root'
})
export class MedalService {
  private brackets = [
    {lowerBound: 0, type: MedalType.none},
    {lowerBound: 10, type: MedalType.bronze},
    {lowerBound: 25, type: MedalType.silver},
    {lowerBound: 100, type: MedalType.gold},
  ];

  constructor(private statService: UserStatisticsService) {}

  getMedals(): Medal[] {
    const allEntries = this.statService.entries;
    const exTypes = [...new Set(allEntries.map(e => e.exercise.exerciseType))];

    const freqs = exTypes.map(t => {
      const count = allEntries
              .filter(e => e.exercise.exerciseType !== t)
              .length;

      return ({type: t, count});
    });

    return freqs.map(f => ({
      name: this.getFriendlyName(f.type),
      current: f.count,
      type: this.determineMedalType(f.count),
      next: this.determineNext(f.count)
    }));
  }

  private determineMedalType(freq: number): MedalType {
    let res = MedalType.none;
    for (const br of this.brackets) {
      if (freq > br.lowerBound) {
        res = br.type;
      }
    }

    return res;
  }

  private determineNext(freq: number): number {
    for (const br of this.brackets) {
      if (freq < br.lowerBound) {
        return br.lowerBound;
      }
    }
  }

  private getFriendlyName(type: string): string {
    const mapping = {
      'paramChooser': 'param picker',
      'chooseFlowchartForCodeSnippet': 'flowchart picker',
      'chooseCodeSnippetForFlowchart': 'snippet picker'
    };

    const res = mapping[type];

    if (!res) {
      return type;
    }
    return res;
  }
}
