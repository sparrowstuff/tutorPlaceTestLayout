function openBurgerMenu() {
	const burgerBtn = document.getElementById('burgerBtn')
	const navMobileMenu = document.getElementById('mainNavMobile')
	const bodyBlurEl = document.querySelector('.body-blur')
	const headerEl = document.querySelector('header')

	burgerBtn.addEventListener('click', () => {
		burgerBtn.classList.toggle('burger-btn--opened')
		navMobileMenu.classList.toggle('main-nav--show')

		if (navMobileMenu.classList.contains('main-nav--show')) {
			bodyBlurEl.style.filter = 'blur(9px)'
			headerEl.style.filter = 'unset'
		} else {
			bodyBlurEl.style.filter = 'unset'
		}
	})
}

export { openBurgerMenu }
