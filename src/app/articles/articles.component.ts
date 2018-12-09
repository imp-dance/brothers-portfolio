import { Component, OnInit } from '@angular/core';
import { getPostListService } from '../get-post-list.service';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles = [];
  openArticle: (id: any) => void;
  closeBox: () => void;
  closeAbout = () => {
    document.querySelector(".aboutSection").classList.add("hide");
  }
  constructor(private postList: getPostListService) {
    window.onhashchange = function() {
      if (window.location.hash.startsWith("#/")){
        /* Open article */
        var articleClick: HTMLElement = document.querySelector(`.articlePost[data-id="${window.location.hash.substr(2)}"]`) as HTMLElement;
        articleClick.click();
      }else if (window.location.hash == ""){
        document.querySelector("article").classList.add("hide");
      }
    }
    
    this.postList.getArticles().subscribe(articles => {
      console.log(articles);
      for (var i = 0; i < articles.length; i++){
        var date = articles[i].date;
        var y = date.substring(0, 4);
        var m = date.substring(5, 7);
        var d = date.substring(8, 10);
        date = d + "/" + m + "/" + y;
        this.articles.push({
          order: articles[i].order,
          name: articles[i].name,
          id: articles[i].id,
          tags: articles[i].tag,
          description: articles[i].description,
          date: date,
          images: articles[i].images,
          videos: articles[i].videos,
          preImg: articles[i].images[0]
        });
      }
      if (window.location.hash.startsWith("#/")){
        /* Open article */
        setTimeout(function(){
          var articleClick: HTMLElement = document.querySelector(`.articlePost[data-id="${window.location.hash.substr(2)}"]`) as HTMLElement;
          articleClick.click();
        }, 10);
      }
    });
    this.closeBox = function(){
      document.querySelector("article").classList.add("hide");
      document.querySelector("main").setAttribute("style", "overflow:auto;");
      history.pushState(null, null, '');
    }
    this.openArticle = function(id){
      document.querySelector("main").scrollTop = 0;
      document.querySelector("main").setAttribute("style", "overflow:hidden;");
      history.pushState(null, null, `#/${this.articles[id].id}`);
      // images
      var imageString: string = ``;
      for (var i = 0; i < this.articles[id].images.length; i++){
        imageString += `<img src="${this.articles[id].images[i]}" />`;
      }
      var videoString: string = ``;
      var videoEmbed = function(html){
        var pattern1 = /(?:http?s?:\/\/)?(?:www\.)?(?:vimeo\.com)\/?(.+)/g;
        var pattern2 = /(?:http?s?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/)?(.+)/g;
        var pattern3 = /([-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?(?:jpg|jpeg|gif|png))/gi;

        if(pattern1.test(html)){
           var replacement = '<iframe width="100%" src="//player.vimeo.com/video/$1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';

           var html = html.replace(pattern1, replacement);
        }


        if(pattern2.test(html)){
              var replacement = '<iframe width="100%" src="https://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>';
              var html = html.replace(pattern2, replacement);
        } 


        if(pattern3.test(html)){
            var replacement = '<a href="$1" target="_blank"><img class="sml" src="$1" /></a><br />';
            var html = html.replace(pattern3, replacement);
        }          
        return html;
      }
      console.log(this.articles[id]);
      if (this.articles[id].videos != undefined){
        for (var i = 0; i < this.articles[id].videos.length; i++){
          videoString += videoEmbed(this.articles[id].videos[i]);
        }
      }else{
        videoString = "";
      }
      /*document.querySelector(".active") && document.querySelector(".active").classList.remove("active");
      var articleElements = document.querySelectorAll('.articlePost');
      for (var i = 0; i < articleElements.length; i++) {
        articleElements[i].classList.remove("hide");
      }*/
      document.querySelector(".images").innerHTML = "<div class='videos'></div>" + imageString;
      document.querySelector(".videos").innerHTML = videoString;
      // title
      document.querySelector(".title").innerHTML = this.articles[id].name;
      // about
      document.querySelector(".about").innerHTML = this.articles[id].description;
      // software
      document.querySelector(".software").innerHTML = this.articles[id].tags;
      // url
      var dURL = (<HTMLInputElement>document.querySelector(".url"));
      dURL.setAttribute("href", this.articles[id].images[0]);
      // open window
      document.querySelector("article").classList.remove("hide");
      document.querySelector(".images").scrollTop = 0;
    }
 }

  ngOnInit() {
  }
  
}
