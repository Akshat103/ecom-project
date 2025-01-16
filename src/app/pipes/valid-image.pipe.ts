import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validImage'
})
export class ValidImagePipe implements PipeTransform {
  transform(imageUrl: string): Promise<string> {
    const defaultImage = '/assests/images/no-pictures.png';
    return new Promise((resolve) => {
      const img = new Image();
      img.src = imageUrl;

      img.onload = () => resolve(imageUrl);

      img.onerror = () => resolve(defaultImage);
    });
  }
}
