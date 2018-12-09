import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  sort = (filter, $event) => {
    let el: HTMLElement = ($event.target as HTMLElement);
    var articleElements = document.querySelectorAll('.articlePost');
    for (var i = 0; i < articleElements.length; i++) {
        articleElements[i].classList.remove("hide");
        if (filter != ""){
          !articleElements[i].classList.contains(filter) && articleElements[i].classList.add("hide");
        }
    }
    !document.querySelector("article").classList.contains("hide") && history.pushState(null, null, '');
    document.querySelector("article").classList.add("hide");
    document.querySelector(".active") && document.querySelector(".active").classList.remove("active");
    el.classList.add("active");
  }
  openAbout = () => {
    document.querySelector(".aboutSection").classList.remove("hide");
  }
  constructor() { }

  ngOnInit() {
  }

}
