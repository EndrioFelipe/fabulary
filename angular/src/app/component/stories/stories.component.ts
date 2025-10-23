import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent {

  stories = [
    { title: 'A Sombra e o Espelho', excerpt: 'Um conto sobre a dualidade e o que se esconde no reflexo...' },
    { title: 'As Vozes do Bosque', excerpt: 'Entre as árvores, ecos de histórias antigas ainda sussurram.' },
    { title: 'O Círculo da Lua', excerpt: 'Um ritual, um segredo e uma escolha que nunca pode ser desfeita.' },
  ];

  openStory(story: any) {
    alert(`Abrindo: ${story.title}`);
  }
}