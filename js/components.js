function openBurgerMenu() {
	const burgerBtn = document.getElementById('burgerBtn')
	const navMobileMenu = document.getElementById('mainNavMobile')

	burgerBtn.addEventListener('click', () => {
		burgerBtn.classList.toggle('burger-btn--opened')
		navMobileMenu.classList.toggle('main-nav--show')

		const sectionBlocks = document.querySelectorAll('section')

		sectionBlocks.forEach(block => {
			if (navMobileMenu.classList.contains('main-nav--show')) {
				block.style.filter = 'blur(9px)'
			} else {
				block.style.filter = 'unset'
			}
		})
	})
}

export { openBurgerMenu }
