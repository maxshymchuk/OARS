import { Animation, AnimeDir } from './Animation';
import { ModalAlert } from '../models';

export class Modal {
  private currentContainer: HTMLElement;
  private currentModal: HTMLElement;

  constructor(templateId: string) {
    const templateConfirm: HTMLTemplateElement = document.getElementById(templateId) as HTMLTemplateElement;
    const clone: Node = templateConfirm.content.cloneNode(true);

    this.currentContainer = (clone as Element).querySelector('.modal__container');
    this.currentModal = this.currentContainer.querySelector('.modal');

    this.currentModal.addEventListener('click', e => {
      e.stopPropagation();
    });

    this.currentContainer.addEventListener('click', () => {
      this.close();
    });
  }

  alert(params: ModalAlert): void {
    const title: HTMLElement = this.currentModal.querySelector('.title');
    const content: HTMLElement = this.currentModal.querySelector('.content');
    const closeButton: HTMLElement = this.currentModal.querySelector('.close');

    title.innerText = params.title;
    closeButton.innerText = params.closeText ?? 'Закрыть';
    content.innerHTML = params.content ?? '';

    closeButton.addEventListener('click', () => {
      this.close();
    });

    document.body.appendChild(this.currentContainer);

    Animation.Animate(this.currentContainer, { name: 'fading', dir: AnimeDir.Normal });
    Animation.Animate(this.currentModal, { name: 'fading-moving-top', dir: AnimeDir.Normal });
  }

  close(): void {
    Animation.Animate(this.currentModal, { name: 'fading-moving-top', dir: AnimeDir.Reverse });
    Animation.Animate(this.currentContainer, { name: 'fading', dir: AnimeDir.Reverse }, () => {
      document.body.removeChild(this.currentContainer);
      this.currentContainer = null;
      this.currentModal = null;
    });
  }
}
