/* Sticky Navigation CREDIT: Etrics from codepen.io (BEAUTIFUL job on sticky navigation) */
class StickyNavigation {
	
	constructor() {
		this.currentId = null;
		this.currentTab = null;
		this.pastId = null; // this will determine if null space has been reached
		this.tabContainerHeight = 40;
		let self = this;
		this.numAnimate = 0;
		// redirect to selected page
		$('.et-hero-tab').click(function() { 
			self.onTabClick(event, $(this)); 
		});
		// used to resize nav bar appropriately
		$(window).scroll(() => { this.onScroll(); });
		$(window).resize(() => { this.onResize(); });
	}
	
	onTabClick(event, element) {
		event.preventDefault();
		let scrollTop = $(element.attr('href')).offset().top;
		$('html, body').animate({ scrollTop: scrollTop }, 600);
	}
	
	onScroll() {
		this.checkTabContainerPosition();
		this.findCurrentTabSelector();
	}
	
	onResize() {
		if(this.currentId) {
			this.setSliderCss();
		}
	}
	
	checkTabContainerPosition() {
		let id = $(this).attr('href');
		let offset = $('.et-hero-tabs').offset().top + $('.et-hero-tabs').height() - this.tabContainerHeight;
		if($(window).scrollTop() > offset) {
			$('.et-hero-tabs-container').addClass('et-hero-tabs-container--top');
		} 
		else {
			$('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top');
		}
	}
	
	findCurrentTabSelector(element) {
		let newCurrentId;
		let newCurrentTab;
		let self = this;
		$('.et-hero-tab').each(function() {
			let id = $(this).attr('href');
			let offsetTop = $(id).offset().top - self.tabContainerHeight;
			let offsetBottom = $(id).offset().top + $(id).height() - self.tabContainerHeight;
			if($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
				newCurrentId = id;
				newCurrentTab = $(this);
			}
		});
		if(this.currentId != newCurrentId || this.currentId === null) {
			this.pastId = this.currentId;
			this.currentId = newCurrentId;
			this.currentTab = newCurrentTab;
			this.setSliderCss();
		}
		if(this.currentId === "#tab-about" || this.currentId === "#tab-experience") {
			$('.et-hero-tab').css('color', "#eee");
			$('.et-hero-tab-res').css('color', "#eee");
		}
		else {
			$('.et-hero-tab').css('color', "#1c1c1c");
			$('.et-hero-tab-res').css('color', "#1c1c1c");
		}
	}
	
	setSliderCss() {
		let width = 0;
		let left = 0;
		console.log(this.pastId)
		if(this.currentTab) {
			width = this.currentTab.css('width');
			left = this.currentTab.offset().left;
		}
		else if (!this.pastId && !this.currentId) {
			width = 82.203125
			left = 164.40625
		}
		$('.et-hero-tab-slider').css('width', width);
		$('.et-hero-tab-slider').css('left', left);
	}
	
}

new StickyNavigation();