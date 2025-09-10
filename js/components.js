let sectionBlocks = document.querySelectorAll('section')
const headerEL = document.querySelector('.header')
const modalMenu = document.querySelector('.modal')

function openBurgerMenu() {
	const burgerBtn = document.getElementById('burgerBtn')
	const navMobileMenu = document.getElementById('mainNavMobile')

	burgerBtn.addEventListener('click', () => {
		burgerBtn.classList.toggle('burger-btn--opened')
		navMobileMenu.classList.toggle('main-nav--show')

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

		if (!burgerBtn.classList.contains('burger-btn--opened')) {
			modalMenu.classList.remove('modal--show')
		}
	})
}

function modalMenuActions() {
	const closeBtn = document.getElementById('modalCloseBtn')
	const anyGetPermitBtn = document.querySelectorAll('.main-nav__get-permit-btn')

	closeBtn.addEventListener('click', () => {
		if (modalMenu.classList.contains('modal--show')) {
			modalMenu.classList.remove('modal--show')

			if (window.innerWidth > 1024) {
				sectionBlocks.forEach(block => {
					block.style.filter = 'unset'
				})

				headerEL.style.filter = 'unset'
			}
		}
	})

	anyGetPermitBtn.forEach(btn => {
		btn.addEventListener('click', () => {
			modalMenu.classList.add('modal--show')

			if (window.innerWidth > 1024) {
				sectionBlocks.forEach(block => {
					block.style.filter = 'blur(9px)'
				})

				headerEL.style.filter = 'blur(9px)'
			}
		})
	})
}

function submitFormActions() {
	const form = document.getElementById('modalForm')
	const formInput = document.getElementById('formInput')
	const errorText = document.getElementById('inputError')
	const fakePlaceholder = document.getElementById('fakePlaceholder')

	form.addEventListener('submit', e => {
		e.preventDefault()

		if (formInput.value.trim() === '') {
			formInput.classList.add('custom-input--error')
			errorText.style.opacity = '1'
		}
	})

	formInput.addEventListener('input', e => {
		if (e.target.value.trim() !== '') {
			errorText.style.opacity = '0'
			formInput.classList.remove('custom-input--error')
			fakePlaceholder.style.opacity = '0'
		} else {
			fakePlaceholder.style.opacity = '1'
		}
	})
}

export { openBurgerMenu, modalMenuActions, submitFormActions }
