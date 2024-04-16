import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: ``
})
export class AccountSettingsComponent implements OnInit {

  public linkTheme = document.querySelector('#theme');
  // almacenando arreglo de todos los elementos con clase selector de la ul de themes (! para declarar sin inicializar)
  public links!: NodeListOf<Element>;

  constructor() {  }

  ngOnInit(): void {
    this.links = document.querySelectorAll('.selector') 
    // aplicando al inicio para marcar tema seleccionado
    this.checkCurrentTheme();
  }

  changeTheme(theme: string) {

    const url = `./assets/css/colors/${theme}.css`;

    // seteando el atributo recibido desde el string recibido
    this.linkTheme!.setAttribute('href', url);
    // almacenando el tema
    localStorage.setItem('theme', url);

    // llamando al método que aplica el check cuando se selecciona
    this.checkCurrentTheme();
  }


  checkCurrentTheme() {

    // trabajando sobre cada elemento para retornar un cambio bajo ciertas condiciones
    this.links.forEach(elem => {

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
}
