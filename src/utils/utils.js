const utils = {
    //处理时间格式
    formatDate(date) {
        if (!date) return null
        const year = date.getFullYear()
        const month = ((date.getMonth() + 1) >= 10) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))
        const day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
        return year + '-' + month + '-' + day
    },
}

export default utils