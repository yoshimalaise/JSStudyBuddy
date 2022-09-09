import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProblemSetLoaderService } from 'src/app/problem-importer/services/problem-set-loader.service';
import { PresentationGroup } from 'src/model/presentation-group.interface';
import { Presentation } from 'src/model/presentation.interface';
import { state } from 'src/state/state';

@Component({
  selector: 'app-select-presentation',
  templateUrl: './select-presentation.component.html',
  styleUrls: ['./select-presentation.component.scss'],
})
export class SelectPresentationComponent implements OnInit {
  presentationGroups$: Observable<PresentationGroup[]>;

  constructor(pslService: ProblemSetLoaderService, private router: Router) { 
    this.presentationGroups$ = pslService.allPresentationSets$;
  }

  ngOnInit() {}

  startPresentation(p: Presentation) {
    state.selectedPresentation = p;
    this.router.navigate(['present']);
  }
}
