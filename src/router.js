export const showFilteredTasks = (filterType) => {
    console.log('Filter: ', filterType)
}

const handleRouteChange = () => {
    const path = window.location.pathname

    switch (path) {
        case '/':
            showFilteredTasks('all')
            break
        case '/active':
            showFilteredTasks('active')
            break
        case '/completed':
            showFilteredTasks('completed')
            break
        case '':
            showFilteredTasks('all')
            break
        default:
            return
    }
}



export const initRouter = () => {

    console.log('Роутер инициализирован')

    // window.addEventListener('hashchange', () => {
    //     console.log('hash: ', window.location.hash)
    //     handleRouteChange()
    // })

    window.addEventListener('popstate', handleRouteChange);

    document.addEventListener('click', (e) => {
        
        if(e.target.classList.contains('nav-link')) {
            e.preventDefault()
            const newPath = e.target.getAttribute('href');
            // console.log(newPath)
            history.pushState(null, '', newPath); // Меняем URL
            handleRouteChange()
        }
    })

    handleRouteChange()
}

