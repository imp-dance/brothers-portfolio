import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
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
    filter != "" && el.classList.add("active");
  }
  constructor() { }

  ngOnInit() {
  }

}
