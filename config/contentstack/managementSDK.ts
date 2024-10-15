
export const createManagmentHeaders = (method: string) => {
    if (!process.env?.CONTENTSTACK_API_KEY && !process.env.CONTENTSTACK_MANAGEMENT_TOKEN) {
        throw 'management header keys not found, please nclude CONTENTSTACK_API_KEY, CONTENTSTACK_MANAGEMENT_TOKEN in .env.local file'
    }
    const myHeaders = new Headers()
    process.env.CONTENTSTACK_API_KEY && myHeaders.append('api_key', process.env.CONTENTSTACK_API_KEY)
    process.env.CONTENTSTACK_MANAGEMENT_TOKEN && myHeaders.append('authorization', process.env.CONTENTSTACK_MANAGEMENT_TOKEN)
    process.env.CONTENTSTACK_BRANCH && myHeaders.append('branch', process.env.CONTENTSTACK_BRANCH)

    return {
        method: method,
        headers: myHeaders
    }
}