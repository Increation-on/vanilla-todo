export const showFilteredTasks = (filterType) => {
    console.log('Filter: ', filterType)
}

const handleRouteChange = () => {
    const hash = window.location.hash

    switch (hash) {
        case '#/':
            showFilteredTasks('all')
            break
        case '#/active':
            showFilteredTasks('active')
            break
        case '#/completed':
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

    window.addEventListener('hashchange', () => {
        console.log('hash', window.location.hash)
        handleRouteChange()
    })

    handleRouteChange()
}

