import { Component } from '@angular/core';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent {
  projects: Project[] = [
    {
      title: "Beers project",
      repoUrl: "https://github.com/laura-dancoso/beers-vue",
      siteUrl: "https://beers-vue.web.app/",
      imageSrc: "../../../../assets/images/beers.png"
    },
    {
      title: "WikiMovies project",
      repoUrl: "https://github.com/laura-dancoso/wikiMovies",
      siteUrl: "https://wiki-movies.vercel.app/peliculas",
      imageSrc: "../../../../assets/images/wikimovies.png"
    }
  ]
}
