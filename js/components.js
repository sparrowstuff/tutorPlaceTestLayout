function openBurgerMenu() {
	const burgerBtn = document.getElementById('burgerBtn')
	const navMobileMenu = document.getElementById('mainNavMobile')

	burgerBtn.addEventListener('click', () => {
		burgerBtn.classList.toggle('burger-btn--opened')
		navMobileMenu.classList.toggle('main-nav--show')
	})
}

export { openBurgerMenu }
