import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SettingsService {

  private linkTheme = document.querySelector('#theme');

  constructor() {

    const url = localStorage.getItem('theme') || './assets/css/colors/blue-dark.css';
    this.linkTheme!.setAttribute('href', url);
    localStorage.setItem('theme', url);
  }


  changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme!.setAttribute('href', url);
    localStorage.setItem('theme', url);

    this.checkCurrentTheme()
  }

  checkCurrentTheme() {

    const links = document.querySelectorAll('.selector')

    // trabajando sobre cada elemento para retornar un cambio bajo ciertas condiciones
    links.forEach(elem => {

      // limpiando check previo que pueda venir estático en el html
      elem.classList.remove('working');

      // generando las constantes necesarias para generar comparativa que agregue dinámicamente el check del tema seleccionado
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');

      // comparando si la url entre los href que genera el tema seleccionado y el tema actual coinciden, es decir el changeTheme() funciona, agregue el check
      if (btnThemeUrl === currentTheme) { elem.classList.add('working'); }
    });
  }

  getCurrentYear(): number {
    return new Date().getFullYear()
  }
}
