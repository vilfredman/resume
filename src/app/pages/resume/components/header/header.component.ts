import { Component, AfterViewInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements AfterViewInit {
  headerClass: string = '';
  constructor(private router: Router) {
    this.router.events.subscribe((event): void => {
      if (event instanceof NavigationEnd) {
        const url: string = event.url;
        this.headerClass = this.getHeaderClass(url);
      }
    });
  }
  getHeaderClass(url: string): string {
    switch (url) {
      case '/':
        return 'header';
      case '/watches':
        return 'header';
      case '/calculator':
        return 'header';
      case '/movies':
        return 'unfixed-header';
      case '/todo':
        return 'unfixed-header';
      case '/snake':
        return 'unfixed-header';
      default:
        return '';
    }
  }
  ngAfterViewInit() {
    const hamburger = document.querySelector(
      '.header .nav-bar .nav-list .hamburger',
    );
    const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
    const menu_item = document.querySelectorAll(
      '.header .nav-bar .nav-list ul li a',
    );
    const header = document.querySelector('.header1.container') as HTMLElement;

    if (hamburger && mobile_menu) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobile_menu.classList.toggle('active');
      });
    }

    if (header) {
      document.addEventListener('scroll', () => {
        const scroll_position = window.scrollY;
        if (scroll_position > 900) {
          header.style.backgroundColor = '#091330';
        } else {
          header.style.backgroundColor = 'transparent';
        }
      });
    }

    if (menu_item) {
      menu_item.forEach((item) => {
        item.addEventListener('click', () => {
          if (hamburger && mobile_menu) {
            hamburger.classList.toggle('active');
            mobile_menu.classList.toggle('active');
          }
        });
      });
    }
  }
}
