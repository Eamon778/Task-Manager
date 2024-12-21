const allTasks = (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Show all tasks'
    })
}


module.exports = { allTasks }