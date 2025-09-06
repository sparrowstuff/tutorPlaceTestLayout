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

		window.addEventListener('resize', () => {
			if (window.innerWidth > 1024) {
				navMobileMenu.classList.remove('main-nav--show')
				burgerBtn.classList.remove('burger-btn--opened')
				sectionBlocks.forEach(block => (block.style.filter = 'unset'))
			}
		})
	})
}

function submitFormActions() {
	const form = document.getElementById('modalForm')
	const formInput = document.getElementById('formInput')
	const errorText = document.getElementById('inputError')
	const closeBtn = document.getElementById('modalCloseBtn')

	form.addEventListener('submit', e => {
		e.preventDefault()

		if (formInput.value.trim() === '') {
			formInput.classList.add('custom-form__input--error')
			errorText.style.opacity = '1'
		}
	})

	formInput.addEventListener('input', e => {
		if (e.target.value.trim() !== '') {
			errorText.style.opacity = '0'
			formInput.classList.remove('custom-form__input-error')
		}
	})
}
export { openBurgerMenu, submitFormActions }
