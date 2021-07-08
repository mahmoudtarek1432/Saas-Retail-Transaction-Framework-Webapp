
import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  sliderAnimationToggled = false;
  constructor(public activateRoute: ActivatedRoute, public route: Router) { 
    console.log(activateRoute.root)

    if(localStorage.getItem("ApiAccessToken") != null){
      this.route.navigateByUrl("Dashboard")
    }
  }


  ngOnInit(): void {
  }

  navigate(url:string){
    this.route.navigateByUrl(url);
  }

  waveEnter(event:MouseEvent){
    console.log((event.target as Element).attributes);
    
  }

  SlideOpen(element:HTMLButtonElement){

    if(this.sliderAnimationToggled == false){
      this.sliderAnimationToggled = true;
      var sideNav = document.getElementById("side-nav");
      var sideNavBg = document.getElementById("nav-bg");
    
      var timeinterval = setInterval(() =>{animateSliderOpen(this)},20)

      var accel = 0.2;
      var pace = 0.4;
      var position = 6;
      var waitFrames = 5;
      var waitCounter = 0;
      var firstLap = true
      
      element.style.right = position +"px";
      function animateSliderOpen(ctx:HomeComponent){
        pace = pace + accel;
        
        if(position < 20 && firstLap == true){
          position = pace + position;
          element.style.right = position +"px";
          
        }
        else if(Math.floor(position) == 20 && waitCounter < waitFrames && firstLap == true){
          waitCounter++;
          console.log(waitCounter+" "+waitFrames)
          
        }
        else if(Math.floor(position) <= 20 && waitCounter >= waitFrames){
         
          firstLap = false;
          position = position - pace;
          element.style.right = position +"px";
          console.log(Math.floor(position) )
        }
        if(element.offsetLeft >= window.outerWidth){
          element.setAttribute('style', 'display:none !important');

          var navbarTimeInterval = setInterval(() => {animateSideNavbar(ctx)}, 5)
          clearInterval(timeinterval)
          pace = 0.4;
          var NavBarposition = -70; //percent
          var opacity = 0;
          sideNavBg!.style.display="block";
          sideNav!.style.display = "block"

          function animateSideNavbar(ctx:HomeComponent){

            if(NavBarposition < 0){
              if(NavBarposition >= -30 && pace >= 0.1){ //slowdown
                console.log(pace)
                pace = pace - 0.003
              }
              NavBarposition = NavBarposition + pace;
              sideNav!.style.right = NavBarposition+"%";
            }
            if(opacity < 0.5){
              opacity = opacity + 0.001
              sideNavBg!.style.opacity = opacity+"";
            }
            if(opacity >= 0.5 && NavBarposition >= 0){
              clearInterval(navbarTimeInterval)
              ctx.sliderAnimationToggled = false;
            }
          }
        }
      }
    }
    }

    SlideClose(){
      if(this.sliderAnimationToggled == false){
        this.sliderAnimationToggled = true;

        var sideNav = document.getElementById("side-nav");
        var sideNavBg = document.getElementById("nav-bg");
        var toggle = document.getElementById("slider");
        toggle!.style.display = "block"
        toggle!.style.right = "6px";

        var pace = -2;
        var NavBarposition = -0.1;
        var opacity = 0.5

        var timeinterval = setInterval(() =>{animateCloseNavBar(this)},20)
        function animateCloseNavBar(ctx: HomeComponent){

            if(NavBarposition >= -70){
              
              NavBarposition = NavBarposition + pace;
              sideNav!.style.right = NavBarposition+"%";
            }
            if(NavBarposition < -70){
              sideNavBg!.style.display = "none";
              sideNav!.style.display = "none";
              clearInterval(timeinterval)
              ctx.sliderAnimationToggled = false
            }
        }
      }
  }
}
