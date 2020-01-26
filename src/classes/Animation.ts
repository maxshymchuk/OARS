export enum AnimeDir {
  Normal = 'normal',
  Reverse = 'reverse'
}

export type AnimationType = {
  time?: number;
  animeType?: string;
  dir?: AnimeDir;
  count?: number | string;
  fillMode?: string;
  name?: string;
};

export class Animation {
  static Animate(element: HTMLElement, props: AnimationType, callback?: () => void) {
    if (!element) return;
    props = {
      name: props.name,
      time: props.time ?? 500,
      dir: props.dir ?? AnimeDir.Normal,
      animeType: props.animeType ?? 'ease-in-out',
      count: props.count ?? 1,
      fillMode: props.fillMode ?? 'forwards'
    };
    element.style.animation = Object.keys(props)
      .map(k => (k === 'time' ? `${props[k] / 1000}s` : props[k]))
      .join(' ');
    element.style.pointerEvents = 'none';
    setTimeout(() => {
      if (callback) callback();
      element.style.animation = '';
      element.style.pointerEvents = 'auto';
    }, props.time);
  }
}
